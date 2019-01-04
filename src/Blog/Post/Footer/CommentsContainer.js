import React, { Component } from "react";

import getContentReplies from "Functions/getContentReplies";
import sendComment from "Functions/sendComment";
import uuidv4 from "uuid/v4";
import delay from "Functions/delay";

import { hot } from "react-hot-loader";
import colors from "styles/colors";
import styled from "styled-components";

import store from "../../../store";
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
      innerWidth: window.innerWidth
    };

    this.handleSendComment = this.handleSendComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateComments = this.updateComments.bind(this);
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
    const login = store.getState().login.status;
    if (login) {
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
    return (
      <Container>
        <Title>
          {this.props.likesNumber +
            " Likes " +
            this.props.children +
            " Comments"}
        </Title>

        <Content>
          <Comments
            postAuthor={this.props.postAuthor}
            postPermlink={this.props.postPermlink}
          />
        </Content>

        <InputContainer>
          <Input
            placeholder="Send something"
            name="comment"
            type="text"
            value={this.state.comment}
            onChange={this.handleInputChange}
          />
          {this.state.comment.length > 1 ? (
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
