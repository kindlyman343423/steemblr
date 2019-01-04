import React, { Component } from "react";

import Spinner from ".././Spinner";
import Comment from "./Comment";
import getContentReplies from "../.././Functions/getContentReplies";
import sendComment from "../.././Functions/sendComment";
import uuidv4 from "uuid/v4";
import delay from "../../Functions/delay";
import steemVote from "../.././Functions/Steem/steemVote";
import { hot } from "react-hot-loader";

import store from "../../store";

import {
  postVoteToState,
  removeVoteFromState
} from "../../actions/stateActions";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: "",
      votedComments: [],
      votesToPush: [],
      votesToRemove: [],
      isLoading: true,
      innerWidth: window.innerWidth,
      username: store.getState().steemProfile.profile.user,
      showInput: false
    };

    this.handleSendComment = this.handleSendComment.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateVotingState = this.updateVotingState.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
  }
  async componentWillMount() {
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );

    this.setState({
      comments: apiCall[0],
      votedComments: await store.getState().steemProfileVotes.votes,
      isLoading: false
    });
  }

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
  async handleSendComment(author, permlink, comment) {
    const login = store.getState().login.status;
    if (login) {
      sendComment(author, permlink, this.state.username, comment, uuidv4());
      this.setState({
        comment: ""
      });
      this.updateComments();
    } else {
      alert("You have to login first");
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
    const login = store.getState().login.status;
    if (login) {
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
    } else {
      alert("You have to login first");
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
    return (
      <span>
        {this.state.comments.length === 0 && this.state.isLoading === false ? (
          <p>No comments yet :(</p>
        ) : (
          void 0
        )}
        {this.state.isLoading && <Spinner marginTop="2" />}
        {this.state.comments.map(comment => {
          return (
            <Comment
              handleSendComment={this.handleSendComment}
              comment={comment}
              author={comment.author}
              body={comment.body}
              key={comment.id}
              replies={comment.replies}
              handleVoting={this.handleVoting}
              username={this.state.username}
              permlink={comment.permlink}
              fullPermlink={comment.author + "/" + comment.permlink}
              voteStatus={this.checkVoteStatus(
                comment.author + "/" + comment.permlink
              )}
            />
          );
        })}
      </span>
    );
  }
}

export default hot(module)(Comments);
