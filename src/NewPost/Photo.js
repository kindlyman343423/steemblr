import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import colors from "../styles/colors";
import uploadFiles from "../Functions/uploadFiles";
import deleteImage from "../Functions/deleteImage";
import { MdPhoto, MdPublic } from "react-icons/lib/md";
import { Editor, createEditorState } from "medium-draft";
import newPost from "../Functions/newPost";
import firebaseAuth from "../Functions/firebaseAuth";
import mediumDraftExporter from "medium-draft/lib/exporter";
import { debounce } from "lodash";
const FileInputLabel = styled.label`
  display: flex;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-content: center;
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
const UrlInputLabel = styled.label`
  display: flex;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 2px dashed black;
  border-left: 0;
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
  @media (max-width: 425px) {
    border-left: 2px dashed black;
  }
`;
const UrlButton = styled.div`
  display: none;
`;
const URLinput = styled.input`
  padding: 25px;
  border: 0;
  outline: 0;
  margin-bottom: 20px;
`;
const Container = styled.div`
  position: relative;
  margin-left: -20px;
  margin-right: -20px;
  img {
    width: 100%;
  }
  input {
    padding-left: 25px;
  }
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const FileInput = styled.input`
  display: none;
  opacity: 0;
  outline: none;
  cursor: pointer;
`;
const ClosePhotoBtn = styled.button`
  position: absolute;
  font-size: 16px;
  border-radius: 5px;
  border: 0;
  background: white;
  padding: 7px;
  top: 0;
  right: 0;
  color: black;
  &:hover {
    color: red;
  }
`;
export default class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      uploaded: false,
      fromWeb: false,
      imageUrl: "",
      tags: [],
      type: "photo",
      inputUrl: "",
      editorState: createEditorState(),
      innerWidth: window.innerWidth
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOpenTextArea = this.handleOpenTextArea.bind(this);
    this.handleInputUrl = this.handleInputUrl.bind(this);
    this.inputDebounce = debounce(async function(e) {
      await this.getUrl();
    }, 500);
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
        width:
          this.state.innerWidth > 768
            ? "40vw"
            : this.state.innerWidth <= 768 && this.state.innerWidth > 425
              ? "60vw"
              : "85vw",
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
    if (this.state.uploaded) {
      this.handleCancel();
    }
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
  handleCancel() {
    this.setState({
      uploaded: false
    });
    if (this.state.fromWeb === false) {
      deleteImage();
    }
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
  handleOpenTextArea() {
    this.setState({
      fromWeb: true
    });
  }
  handleInputUrl(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    e.persist();
    this.inputDebounce(e);
  }
  getUrl() {
    this.setState({
      imageUrl: this.state.inputUrl,
      uploaded: true
    });
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
          this.state.fromWeb === true ? (
            <URLinput
              placeholder="Paste a URL"
              name="inputUrl"
              onChange={this.handleInputUrl}
              value={this.state.inputUrl}
            />
          ) : (
            <UploadContainer>
              <FileInputLabel for="file">
                <MdPhoto size={50} />
                Upload photo
                <FileInput
                  type="file"
                  name="file"
                  onChange={this.handleUpload}
                />
              </FileInputLabel>
              <UrlInputLabel for="file" onClick={this.handleOpenTextArea}>
                <MdPublic size={50} />
                Add photo from web
                <UrlButton name="file" />
              </UrlInputLabel>
            </UploadContainer>
          )
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
            <TagsInput
              name="tags"
              value={this.state.tags}
              onChange={this.handleTagsChange}
            />
            <ClosePhotoBtn onClick={this.handleCancel}>X</ClosePhotoBtn>
          </Container>
        )}

        <span styles="width: 100%">
          <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
          <SendBtn onClick={this.handleSend}>Send</SendBtn>
        </span>
      </Modal>
    );
  }
}
