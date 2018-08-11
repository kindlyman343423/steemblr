import React, { Component } from "react";

import CustomImageSideButton from "./ImageSideButton";
import styled, { injectGlobal } from "styled-components";
import Modal from "react-modal";
import { hot } from "react-hot-loader";
import store from "../store";

import newPost from "../Functions/newPost";
import { connect } from "react-redux";

import Photo from "./Photo/";
import Quote from "./Quote/";
import Audio from "./Audio/";
import Video from "./Video/";
import PostForm from "./Form";
import { newPostForm } from "../actions/newPostInterface";

injectGlobal`
  .md-editor-toolbar {
    margin-left: 120px;
  }
  .title:focus {
    outline: none;
    border: 0;
  }
`;

class PostCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isForm: false,
      user: store.getState().steemProfile.profile.user,
      open: this.props.isOpen,
      type: "text",
      innerWidth: window.innerWidth
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSend = this.handleSend.bind(this);

    this.sideButtons = [
      {
        title: "Image",
        component: CustomImageSideButton
      }
    ];
  }

  componentWillUnmount() {
    this.setState({
      open: true
    });
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }
  handleClose() {
    this.setState({
      open: false,
      isSending: false
    });
    this.props.unMountChildren("postCreator");
  }
  async handleSend() {
    this.setState({
      isSending: true
    });

    await newPost(
      this.state.user,
      this.state.title,
      "text goes here",
      this.state.tags,
      this.state.type
    );
    this.handleClose();
  }
  showForm = () => {
    store.dispatch(newPostForm(true));
  };
  renderTypeComponents = () => {
    switch (this.props.newPost.type) {
      case "photos":
        return <Photo showForm={this.showForm} />;
      case "gifs":
        return <Photo showForm={this.showForm} />;
      case "quote":
        return <Quote showForm={this.showForm} />;
      case "audio":
        return <Audio showForm={this.showForm} />;
      case "video":
        return <Video showForm={this.showForm} />;
      default:
        break;
    }
  };
  render() {
    const modalStyle = {
      postion: "fixed",
      height: "100%",

      overlay: {
        backgroundColor: "rgba(28, 49, 58, 0.90)"
      },
      content: {
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        paddingLeft: 0,
        paddingRight: 0,
        width:
          this.state.innerWidth > 768
            ? "40vw"
            : this.state.innerWidth <= 768 && this.state.innerWidth > 425
              ? "60vw"
              : "85vw",
        bottom: "none",
        maxHeight: "60vh",
        border: "0",
        transform: "translate(-50%, -50%)"
      }
    };
    return (
      <Modal isOpen={this.props.newPost.modal} style={modalStyle}>
        {this.renderTypeComponents()}
        {this.props.newPost.isForm && (
          <PostForm
            handleClose={this.handleClose}
            isSending={this.state.isSending}
          />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  newPost: state.newPost
});

export default connect(
  mapStateToProps,
  {}
)(hot(module)(PostCreator));
