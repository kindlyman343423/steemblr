import React, { Component } from "react";
import { Editor, createEditorState } from "medium-draft";
import CustomImageSideButton from "./ImageSideButton";
import styled, { injectGlobal } from "styled-components";
import Modal from "react-modal";
import mediumDraftExporter from "medium-draft/lib/exporter";
import TagsInput from "react-tagsinput";
import store from "../store";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import newPost from "../Functions/newPost";

import "./reactTagsInput.css";

injectGlobal`
  .title {
    font-size: 32px;
    height: 36px;
    outline: none;
    border: 0;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;
    font-weight: 200;
    padding-left: 10px;
  }
  .md-editor-toolbar {
    margin-left: 120px;
  }
  .title:focus {
    outline: none;
    border: 0;
  }
`;
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
    width: "40vw",
    bottom: "none",
    maxHeight: "60vh",
    border: "0",
    transform: "translate(-50%, -50%)"
  }
};

export default class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().steemProfile.profile.user,
      open: this.props.isOpen,
      editorState: createEditorState(),
      tags: [],
      title: "",
      type: "text"
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sideButtons = [
      {
        title: "Image",
        component: CustomImageSideButton
      }
    ];
  }
  onChange = editorState => {
    this.setState({ editorState });
  };

  componentWillUnmount() {
    this.setState({
      open: true
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleOpen() {
    this.setState({
      open: true
    });
  }
  handleClose() {
    this.setState({
      open: false
    });
    this.props.unMountChildren("text");
  }
  handleSend() {
    const content = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    //newPost(this.state.user, this.state.title, content, this.state.tags);
    console.log(
      this.state.user,
      this.state.title,
      content,
      this.state.tags,
      this.state.type
    );
  }
  async handleTagsChange(props) {
    await this.setState({ tags: props });
  }
  render() {
    const { editorState } = this.state;
    return (
      <Modal isOpen={this.state.open} style={modalStyle}>
        <input
          className="title"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          sideButtons={this.sideButtons}
        />
        <TagsInput
          name="tags"
          value={this.state.tags}
          onChange={this.handleTagsChange}
        />
        <span styles="width: 100%">
          <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
          <SendBtn onClick={this.handleSend}>Send</SendBtn>
        </span>
      </Modal>
    );
  }
}
