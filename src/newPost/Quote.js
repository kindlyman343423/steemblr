import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import colors from "../styles/colors";
import { Editor, createEditorState, Block, addNewBlock } from "medium-draft";
import mediumDraftExporter from "medium-draft/lib/exporter";
const Input = styled.input`
  margin-left: 5px;
  border: 0;
  outline: 0;
  font-size: 16px;
`;
export default class Quote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      tags: [],
      type: "quote",
      source: "",
      editorState: createEditorState()
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.onChangeSource = this.onChangeSource.bind(this);
    this.modalStyle = {
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
        maxHeight: "65vh",
        border: "0",
        display: "flex",
        flexDirection: "column",
        transform: "translate(-50%, -50%)"
      }
    };
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
    this.props.unMountChildren("quote");
  }
  onChange = editorState => {
    this.setState({ editorState });
  };
  onChangeSource(e) {
    this.setState({
      source: e.target.value
    });
    console.log(this.state.source);
  }
  async handleTagsChange(props) {
    await this.setState({
      tags: props
    });
  }
  handleSend() {}
  render() {
    return (
      <Modal style={this.modalStyle} isOpen={this.state.open}>
        <Editor
          ref="editor"
          placeholder="Quote"
          editorState={this.state.editorState}
          onChange={this.onChange}
          sideButtons={[]}
          disableToolbar={true}
        />
        <span styles="width: 100%">
          -<Input
            placeholder="Source"
            type="text"
            value={this.state.source}
            onChange={this.onChangeSource}
          />
        </span>
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
