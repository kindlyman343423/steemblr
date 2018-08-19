import React, { Component } from "react";
import styled from "styled-components";
import TextEditor from "./TextEditor";
import Tags from "./Tags";
import Title from "./Title";
import CloseBtn from "../../Components/CloseBtn";
import SendBtn from "../../Components/SendBtn";
import SpinnerOverlay from "../SpinnerOverlay";
import {
  newPostModal,
  newPostIsError,
  newPostErrorMsg
} from "../../actions/newPostInterface";
import store from "../../store";
import Quote from "./Quote";
import QuoteSource from "./QuoteSource";
import newPost from "../../Functions/newPost";
const Form = styled.form`
  box-sizing: border-box;
  position: relative;

  img {
    width: 100%;
  }
`;
const Buttons = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-left: 20px;
  padding-right: 30px;
`;
export default class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSending: this.props.isSending
    };
  }
  postValidation() {
    const post = store.getState().newPost;

    if (
      (post.type === "photos" && post.photo === "") ||
      (post.type === "gifs" && post.photo === "")
    ) {
      store.dispatch(newPostIsError(true));
      store.dispatch(newPostErrorMsg("You have to upload photo"));
      return false;
    } else if (
      (post.type === "video" && post.video === "") ||
      (post.type === "audio" && post.audio === "")
    ) {
      store.dispatch(newPostIsError(true));
      store.dispatch(newPostErrorMsg("You have to paste URL"));
      return false;
    } else {
      return true;
    }
  }
  handleSend = async e => {
    e.preventDefault();
    if (this.postValidation() === false) {
      return void 0;
    }
    this.setState({
      isSending: true
    });

    await newPost();
    if (!store.getState().newPostInterface.isError) {
      this.handleClose();
    } else {
      this.setState({
        isSending: false
      });
    }
  };

  handleClose = () => {
    store.dispatch(newPostModal(false));
  };
  render() {
    if (store.getState().newPost.type === "quote") {
      return (
        <Form onSubmit={this.handleSend}>
          {this.state.isSending ? <SpinnerOverlay /> : void 0}
          <Title />
          <Quote />
          <QuoteSource />
          <Tags />
          <Buttons>
            <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
            <SendBtn type="submit" value="submit">
              Send
            </SendBtn>
          </Buttons>
        </Form>
      );
    }
    return (
      <Form onSubmit={e => this.handleSend(e)}>
        {this.state.isSending ? <SpinnerOverlay /> : void 0}
        <Title />
        <TextEditor />
        <Tags />
        <Buttons>
          <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
          <SendBtn type="submit" value="submit">
            Send
          </SendBtn>
        </Buttons>
      </Form>
    );
  }
}
