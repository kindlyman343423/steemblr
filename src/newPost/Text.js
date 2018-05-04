import React, { Component } from "react";
import { Editor, createEditorState } from "medium-draft";
import CustomImageSideButton from "./ImageSideButton";
import styled, { injectGlobal } from "styled-components";
import Modal from "react-modal";
import mediumDraftExporter from "medium-draft/lib/exporter";
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
    width: "45vw",
    height: "45vh",
    bottom: "none",

    border: "0",
    transform: "translate(-50%, -50%)"
  }
};

const SendBtn = styled.button`
  outline: none;
`;
export default class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.isOpen,
      editorState: createEditorState()
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
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

  render() {
    const { editorState } = this.state;
    return (
      <Modal
        isOpen={this.state.open}
        onRequestClose={this.handleClose}
        style={modalStyle}
      >
        <input className="title" name="title" placeholder="Title" />
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          sideButtons={this.sideButtons}
        />
        <SendBtn onClick={this.handleSave}>Send</SendBtn>
      </Modal>
    );
  }
}
