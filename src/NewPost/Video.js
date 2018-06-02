import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import { Editor, createEditorState } from "medium-draft";
import newPost from "../Functions/newPost";
import mediumDraftExporter from "medium-draft/lib/exporter";
import TubeEmbed from "react-tube-embed";
import { debounce } from "lodash";
const TextArea = styled.textarea`
  border: 0;
  outline: none;
`;
const Container = styled.div`
  margin-left: -20px;
  margin-right: -20px;
  position: relative;
  iframe {
    width: 100%;
    height: 300px;
    border: 0;
  }
`;
const Button = styled.button`
  position: absolute;
  border: 0;
  font-size: 16px;
  background: white;
  padding: 10px;
  top: 0;
  right: 0;
  color: black;
  &:hover {
    color: red;
  }
`;
export default class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      textarea: "",
      isVideoSet: false,
      tags: [],
      type: "video",
      editorState: createEditorState(),
      innerWidth: window.innerWidth
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.cancelVideo = this.cancelVideo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputDebounce = debounce(async function(e) {
      await this.setVideo();
    }, 1000);
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
    this.setState({
      open: false
    });
    this.props.unMountChildren("video");
  }
  onChange = editorState => {
    this.setState({ editorState });
  };

  handleSend() {
    const content = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    const post = `${this.state.textarea} <br /> ${content}`;

    newPost(
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
  async handleTextArea(e) {
    await this.setState({
      textarea: e.target.value
    });
    e.persist();
    this.inputDebounce(e);
  }
  async setVideo() {
    if (this.state.textarea.includes("https://")) {
      if (this.state.isVideoSet === true) {
        await this.setState({
          isVideoSet: false
        });
        this.setState({
          isVideoSet: true
        });
      } else {
        await this.setState({
          isVideoSet: true
        });
      }
    } else {
      return void 0;
    }
  }
  cancelVideo() {
    this.setState({
      isVideoSet: false,
      textarea: ""
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <Modal style={this.modalStyle} isOpen={this.state.open}>
        {this.state.isVideoSet ? (
          <Container>
            <TubeEmbed src={this.state.textarea} />
            <Button onClick={this.cancelVideo}>X</Button>
          </Container>
        ) : (
          <TextArea
            name="textarea"
            placeholder="Enter video url"
            onChange={this.handleTextArea}
          />
        )}
        {this.state.isVideoSet ? (
          <Container>
            {this.state.isVideoSet ? (
              <input
                className="title"
                name="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            ) : (
              void 0
            )}
            <Editor
              ref="editor"
              placeholder="Something about it..."
              editorState={this.state.editorState}
              onChange={this.onChange}
              sideButtons={[]}
            />
          </Container>
        ) : (
          void 0
        )}

        {this.state.isVideoSet ? (
          <TagsInput
            name="tags"
            value={this.state.tags}
            onChange={this.handleTagsChange}
          />
        ) : (
          void 0
        )}
        <span styles="width: 100%">
          <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
          <SendBtn onClick={this.handleSend}>Send</SendBtn>
        </span>
      </Modal>
    );
  }
}
