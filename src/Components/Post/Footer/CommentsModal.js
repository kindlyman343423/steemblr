import React, { Component } from "react";
import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import Comments from "../../Comments/Comments";
import getContentReplies from "Functions/getContentReplies";
import sendComment from "Functions/Steem/sendComment";
import sendCommentFirebase from "Functions/Firebase/sendComment";
import uuidv4 from "uuid/v4";
import delay from "Functions/delay";

import { hot } from "react-hot-loader";
import colors from "styles/colors";
import styled from "styled-components";
import Modal from "react-modal";

import store from "../../../store";
import updatePost from "actions/updatePost";

const Title = styled.div`
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;

  z-index: 9999;
  font-weight: 300;
  padding: 10px;
  border-bottom: 1px solid ${colors.borders.light};
`;
const Content = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-top: 20px;
  padding-bottom: 60px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #e1e2e1;
`;
const InputContainer = styled.div`
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 5px;
  border-top: 1px solid ${colors.borders.light};
  width: 100%;
  min-height: 40px;
`;
const Input = styled.input`
  border: 0;
  outline: 0;
  width: 100%;
  top: 12px;
  left: 5px;
  background: rgba(255, 255, 255, 1);
  height: 30px;

  font-size: 16px;
  padding-left: 15px;
  z-index: 1000;

  &:focus {
    background: rgba(255, 255, 255, 1);
    transition: 0.2s;
  }
`;
const SendButton = styled.button`
  font-family: "Roboto", sans-serif;
  right: 0;
  bottom: 5px;
  font-weight: 300;
  font-size: 16px;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

class CommentsModal extends Component {
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
      innerWidth: window.innerWidth,
      firebaseComments: []
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSendComment = this.handleSendComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  async componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    const { post } = this.props;
    this.setState({
      open: true,
      isLoading: false,
      firebaseComments: post.comments !== undefined ? post.comments : []
    });
  }
  componentDidUpdate(prevProps) {
    const { post } = this.props;
    if (post !== prevProps.post) {
      this.setState({
        firebaseComments: post.comments
      });
    }
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

  async updateComments(platform) {
    const { postAuthor, postPermlink } = this.props;
    if (platform === "steem") {
      await delay(3000);
      const apiCall = await getContentReplies(postAuthor, postPermlink);
      this.setState({
        comments: apiCall[0]
      });
    } else if (platform === "email") {
      await store.dispatch(updatePost(postPermlink));
      const post = store.getState().steemPosts.posts.filter(post => {
        return post.permlink === postPermlink;
      });
      this.setState({
        firebaseComments: post[0].comments
      });
    }
  }
  async handleSendComment() {
    const login = store.getState().login;
    const { post, postPlatform } = this.props;
    if (login.status && login.platform === "steem") {
      //handling sending comments for STEEM users
      const commentToSend = {
        permlink: post.permlink,
        comment: this.state.comment,
        username: login.username,
        platform: login.platform,
        isReply: false,
        replyTo: "",
        token: login.token
      };
      if (postPlatform === "steem") {
        sendComment(
          this.props.postAuthor,
          this.props.postPermlink,
          login.username,
          this.state.comment,
          uuidv4()
        );
        this.setState({
          comment: ""
        });
        this.updateComments("steem");
      } else if (postPlatform === "email") {
        await sendCommentFirebase(commentToSend);
        this.setState({
          comment: ""
        });
        this.updateComments("email");
      }
    } else if (login.status && login.platform === "email") {
      //handling sending comments for firebase users
      const commentToSend = {
        permlink: post.permlink,
        comment: this.state.comment,
        username: login.username,
        platform: login.platform,
        isReply: false,
        replyTo: "",
        token: login.token
      };
      sendCommentFirebase(commentToSend);
      this.setState({
        comment: ""
      });
      this.updateComments("email");
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

  render() {
    const modalStyle = {
      content: {
        left: "20px",
        overflowY: "hidden",
        overflowX: "hidden",
        display: "flex",
        bottom: "none",
        flexDirection: "column",
        padding: "0",
        maxHeight: "60vh",
        width:
          this.state.innerWidth > 768
            ? "40vw"
            : this.state.innerWidth < 768 && this.state.innerWidth > 425
              ? "60vw"
              : "85vw"
      },
      overlay: {
        backgroundColor: "transparent"
      }
    };
    const { firebaseComments, comment } = this.state;
    const { post, postAuthor, postPermlink, postPlatform } = this.props;
    const numOfUpvotes = post.upvotes !== undefined ? post.upvotes.length : 0;
    const numOfComments =
      post.comments !== undefined ? post.comments.length : 0;
    return (
      <span>
        <Icon
          icon={ic_message}
          size={30}
          style={{ cursor: "pointer" }}
          onClick={this.handleOpen}
        />
        <Modal
          title={
            this.props.likesNumber +
            " Likes " +
            this.props.children +
            " Comments"
          }
          modal={false}
          isOpen={this.state.open}
          onRequestClose={this.handleClose}
          style={modalStyle}
        >
          {postPlatform === "steem" && (
            <Title>
              {this.props.likesNumber + numOfUpvotes + " Likes "}
              {this.props.children + numOfComments + " Comments"}
            </Title>
          )}
          {postPlatform === "email" && (
            <Title>
              {numOfUpvotes + " Likes "}
              {numOfComments + " Comments"}
            </Title>
          )}
          <Content>
            <Comments
              postAuthor={postAuthor}
              postPermlink={postPermlink}
              postPlatform={post.platform}
              firebaseComments={firebaseComments}
              inReply={false}
              origin={postPermlink}
              comLocation={"main"}
            />
          </Content>
          <InputContainer>
            <Input
              placeholder="Send something"
              name="comment"
              type="text"
              value={comment}
              onChange={this.handleInputChange}
            />
            {comment.length > 1 ? (
              <SendButton onClick={this.handleSendComment}>Reply</SendButton>
            ) : (
              <SendButton disabled>Reply</SendButton>
            )}
          </InputContainer>
        </Modal>
      </span>
    );
  }
}

export default hot(module)(CommentsModal);
