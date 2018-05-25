import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import colors from "../styles/colors";
import uploadFiles from "../Functions/uploadFiles";
import { MdPhoto } from "react-icons/lib/md";
import { Editor, createEditorState } from "medium-draft";
import newPost from "../Functions/newPost";
import firebaseAuth from "../Functions/firebaseAuth";
import mediumDraftExporter from "medium-draft/lib/exporter";

const FileInputLabel = styled.label`
  display: flex;

  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  border: 2px dashed black;
  flex-direction: column;
  padding: 50px;
  cursor: pointer;
  width: 100%;
  transition: 500ms ease;
  margin-bottom: 10px;
  &:hover {
    transition: 500ms ease;
    border-color: ${colors.events.hover};
    color: ${colors.events.hover};
  }
`;
const Container = styled.div`
  margin-left: -20px;
  margin-right: -20px;
  img {
    width: 100%;
  }
`;
const FileInput = styled.input`
  display: none;
  opacity: 0;
  outline: none;
  cursor: pointer;
`;

export default class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      uploaded: false,
      imageUrl: "",
      tags: [],
      type: "photo",
      editorState: createEditorState()
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSend = this.handleSend.bind(this);

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
    this.props.unMountChildren("photo");
  }
  onChange = editorState => {
    this.setState({ editorState });
  };
  async handleUpload(e) {
    firebaseAuth();
    console.log(e.target.files[0]);
    await uploadFiles(e.target.files[0]).then(response => {
      this.setState({
        uploaded: true,
        imageUrl: response
      });
    });
    /*this.setState({
      editorState: addNewBlock(this.state.editorState, Block.IMAGE, {
        src: this.state.imageUrl
      })
    });*/
  }
  handleSend() {
    const content = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    const post = `<img src="${
      this.state.imageUrl
    }" alt="Post"/> <br /> ${content}`;

    console.log(
      this.state.user,
      this.state.title,
      post,
      this.state.tags,
      this.state.type
    );
  }
  componentWillUnmount() {
    this.setState({
      open: true
    });
  }
  async handleTagsChange(props) {
    await this.setState({
      tags: props
    });
  }
  render() {
    return (
      <Modal style={this.modalStyle} isOpen={this.state.open}>
        {this.state.uploaded === false ? (
          <FileInputLabel for="file">
            <MdPhoto size={50} />
            Upload photo
            <FileInput type="file" name="file" onChange={this.handleUpload} />
          </FileInputLabel>
        ) : (
          <Container>
            <img src={this.state.imageUrl} alt="Post" />
            <Editor
              ref="editor"
              placeholder="Something about it..."
              editorState={this.state.editorState}
              onChange={this.onChange}
              sideButtons={[]}
            />
          </Container>
        )}
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
