import React, { Component } from "react";
import { Editor, createEditorState } from "medium-draft";
import CustomImageSideButton from "./ImageSideButton";
import styled, { injectGlobal } from "styled-components";
import Modal from "react-modal";
import mediumDraftExporter from "medium-draft/lib/exporter";
import TagsInput from "react-tagsinput";

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

const SendBtn = styled.button`
  outline: none;
  align-self: flex-end;
  float: right;
  padding: 10px;
  border: 0;
  background-color: #29434e;
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  &:hover {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;
const CloseBtn = styled.button`
  align-self: flex-end;
  padding: 10px;
  border: 0;
  background-color: transparent;
  outline: none;

  font-weight: 700;
  transition: 0.5s;
  &:hover {
    background-color: #808e95;
    transition: 0.5s;
  }
`;
export default class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.isOpen,
      editorState: createEditorState(),
      tags: []
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
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
  componentDidMount() {
    //this.refs.editor.focus();
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
      open: false
    });
    this.props.unMountChildren("text");
  }
  handleSave() {
    const html2 = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    console.log(html2);
  }
  async handleTagsChange(props) {
    await this.setState({ tags: props });
  }
  render() {
    const { editorState } = this.state;
    return (
      <Modal isOpen={this.state.open} style={modalStyle}>
        <input className="title" name="title" placeholder="Title" />
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          sideButtons={this.sideButtons}
        />
        <TagsInput value={this.state.tags} onChange={this.handleTagsChange} />
        <span styles="width: 100%">
          <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
          <SendBtn onClick={this.handleSave}>Send</SendBtn>
        </span>
      </Modal>
    );
  }
}
