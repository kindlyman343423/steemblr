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
import newPost from "../../Functions/Steem/newPost";
import newPostFirebase from "../../Functions/Firebase/newPostFirebase";
import RebloggedPost from "../../Components/Post/Footer/RebloggedPost";
import PostHeader from "./PostHeader";
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
  //Component handling post form, validation and sending
  constructor(props) {
    super(props);

    this.state = {
      isSending: this.props.isSending,
      isReblogged: store.getState().newPostInterface.isReblogged
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
    const platform = store.getState().login.platform;
    e.preventDefault();
    if (this.postValidation() === false) {
      return void 0;
    }
    this.setState({
      isSending: true
    });
    if (platform === "steem") {
      await newPost();
    } else if (platform === "email") {
      await newPostFirebase();
    }

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
    const { isReblogged, isSending } = this.state;
    if (store.getState().newPost.type === "quotes") {
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
    } else {
      return (
        <Form onSubmit={e => this.handleSend(e)}>
          {isReblogged && <PostHeader />}
          {isReblogged && <RebloggedPost />}
          {isSending && <SpinnerOverlay />}
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
}
