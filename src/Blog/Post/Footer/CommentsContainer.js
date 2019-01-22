import React, { Component } from "react";

import getContentReplies from "Functions/getContentReplies";
import sendComment from "Functions/Steem/sendComment";
import sendCommentFirebase from "Functions/Firebase/sendComment";
import uuidv4 from "uuid/v4";
import delay from "Functions/delay";

import { hot } from "react-hot-loader";
import colors from "styles/colors";
import styled from "styled-components";

import store from "../../../store";
import { updatePostByAuthor } from "actions/updatePost";
import Comments from "Components/Comments/Comments";
const Container = styled.div`
  overflow: hidden;
`;
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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  width: 100%;
  max-height: 30vh;
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
      comments: [],
      comment: "",
      votedComments: [],
      votesToPush: [],
      votesToRemove: [],
      innerWidth: window.innerWidth,
      firebaseComments: []
    };

    this.handleSendComment = this.handleSendComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  async componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
    const { post } = this.props;
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );
    this.setState({
      comments: apiCall[0],
      open: true,
      votedComments: await store.getState().steemProfileVotes.votes,
      isLoading: false,
      firebaseComments: post.comments !== undefined ? post.comments : []
    });
  }
  updateDimensions() {
    this.setState({
      innerWidth: window.innerWidth
    });
  }

  async updateComments(platform) {
    const { postAuthor, postPermlink } = this.props;
    if (platform === "steem") {
      await delay(3000);
      const apiCall = await getContentReplies(postAuthor, postPermlink);
      this.setState({
        comments: apiCall[0]
      });
    } else if (platform === "email") {
      await store.dispatch(updatePostByAuthor(postPermlink));
    }
  }
  componentDidUpdate(prevProps) {
    const { post } = this.props;
    if (post !== prevProps.post) {
      this.setState({
        firebaseComments: post.comments
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
    const { firebaseComments, comment } = this.state;
    const { post, postAuthor, postPermlink, postPlatform } = this.props;
    const numOfUpvotes = post.upvotes !== undefined ? post.upvotes.length : 0;
    const numOfComments =
      post.comments !== undefined ? post.comments.length : 0;
    return (
      <Container>
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
            postPlatform={postPlatform}
            firebaseComments={
              firebaseComments !== undefined ? firebaseComments : []
            }
            inReply={false}
            origin={postPermlink}
            comLocation={"blog"}
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
      </Container>
    );
  }
}

export default hot(module)(CommentsModal);
