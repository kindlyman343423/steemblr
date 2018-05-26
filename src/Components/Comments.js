import React, { Component } from "react";
import { MdInsertComment } from "react-icons/lib/md/";
import Dialog from "material-ui/Dialog";
import Spinner from "./Spinner";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Input } from "rebass";
import { MdSend } from "react-icons/lib/md/";
import Comment from "./Comment";
import getContentReplies from ".././Functions/getContentReplies";
import sendComment from ".././Functions/sendComment";
import uuidv4 from "uuid/v4";
import delay from "../Functions/delay";
import steemVote from ".././Functions/steemVote";

//REDUX
import store from "../store";
import { postVoteToState, removeVoteFromState } from "../actions/stateActions";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      comments: [],
      comment: "",
      votedComments: [],
      votesToPush: [],
      votesToRemove: [],
      isLoading: true,
      innerWidth: window.innerWidth
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSendComment = this.handleSendComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateVotingState = this.updateVotingState.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  async componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );

    this.setState({
      comments: apiCall[0],
      open: true,
      votedComments: await store.getState().steemProfileVotes.votes,
      isLoading: false
    });
  }
  updateDimensions() {
    this.setState({
      innerWidth: window.innerWidth
    });
  }
  handleOpen = async () => {
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );

    await this.setState({
      comments: apiCall[0],
      open: true
    });
  };

  handleClose = () => {
    this.state.votesToPush.map(vote => {
      this.updateVotingState(vote, true);
      return void 0;
    });

    this.state.votesToRemove.map(vote => {
      return this.updateVotingState(vote, false);
    });
    this.setState({ open: false });
  };

  async updateComments() {
    await delay(3000);
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );
    this.setState({
      comments: apiCall[0]
    });
  }
  async handleSendComment() {
    if (this.state.comment === "") {
      alert("Comment can't be empty");
    } else {
      sendComment(
        this.props.postAuthor,
        this.props.postPermlink,
        this.props.username,
        this.state.comment,
        uuidv4()
      );
      this.setState({
        comment: ""
      });
      this.updateComments();
    }
  }
  handleInputChange(e) {
    const target = e.target;
    let value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleVoting(username, author, permlink, votePercent) {
    const votePower = store.getState().votePower.power;
    if (votePercent === 0 || votePercent === undefined) {
      await steemVote(username, author, permlink, votePower);
      const state = this.state.votedComments;
      const newItem = [
        {
          permlink: author + "/" + permlink,
          percent: votePower
        }
      ];
      let newState = [];
      await this.setState({
        votedComments: newState.concat(state, newItem),

        votesToPush: this.state.votesToPush.concat(newItem)
      });
    } else if (votePercent > 0) {
      await steemVote(username, author, permlink, 0);

      const state = this.state.votedComments;
      const fullPermlink = author + "/" + permlink;
      let newState = state.filter(item => {
        return item.permlink !== fullPermlink;
      });
      const newItem = [
        {
          permlink: fullPermlink,
          percent: votePercent
        }
      ];
      this.setState({
        votedComments: newState,
        votesToRemove: this.state.votesToRemove.concat(newItem)
      });
    }
  }
  async updateVotingState(props, action) {
    if (action === true) {
      store.dispatch(postVoteToState(props));
    } else if (action === false) {
      store.dispatch(removeVoteFromState(props));
    }
  }
  checkVoteStatus(props) {
    const find = this.state.votedComments.find(o => o.permlink === props);

    if (find) {
      return {
        status: true,
        percent: find.percent
      };
    } else {
      return {
        status: false,
        percent: 0
      };
    }
  }
  render() {
    const dialogTitleStyle = {
      fontSize: "16px",
      fontWeight: "500"
    };
    const dialogStyle = {
      width:
        this.state.innerWidth > 768
          ? "40vw"
          : this.state.innerWidth < 768 && this.state.innerWidth > 425
            ? "60vw"
            : "85vw",
      height: "10vh"
    };
    const actionsStyle = {
      display: "inline-flex",
      alignItems: "center"
    };
    const spinnerStyle = {
      display: "flex",
      alignItems: "center",
      color: "pink"
    };
    const actions = [
      <Input
        bg="white"
        color="black"
        placeholder="Reply"
        name="comment"
        value={this.state.comment}
        onChange={this.handleInputChange}
      />,
      <MdSend size={24} onClick={this.handleSendComment} />
    ];
    return (
      <span>
        <MdInsertComment size={20} onClick={this.handleOpen} />
        <Dialog
          title={
            this.props.likesNumber +
            " Likes " +
            this.state.comments.length +
            " Comments"
          }
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          style={dialogStyle}
          actions={actions}
          titleStyle={dialogTitleStyle}
          actionsContainerStyle={actionsStyle}
          repositionOnUpdate={true}
        >
          {this.state.isLoading ? (
            <MuiThemeProvider>
              <Spinner style={spinnerStyle} marginTop="2" />
            </MuiThemeProvider>
          ) : (
            void 0
          )}
          {this.state.comments.map(comment => {
            return (
              <Comment
                author={comment.author}
                body={comment.body}
                key={uuidv4()}
                handleVoting={this.handleVoting}
                username={this.props.username}
                permlink={comment.permlink}
                fullPermlink={comment.author + "/" + comment.permlink}
                voteStatus={this.checkVoteStatus(
                  comment.author + "/" + comment.permlink
                )}
              />
            );
          })}
        </Dialog>
      </span>
    );
  }
}

export default Comments;
