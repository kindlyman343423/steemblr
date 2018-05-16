import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import colors from "../styles/colors";
import uploadFiles from "../Functions/uploadFiles";
import { Editor, createEditorState, Block, addNewBlock } from "medium-draft";
import newPost from "../Functions/newPost";
import mediumDraftExporter from "medium-draft/lib/exporter";
import delay from "../Functions/delay";
import deezerApi from "../Functions/deezerApi";
import { debounce } from "lodash";
const Input = styled.input`
  padding: 5px;
  border: 0;
  outline: 0;
`;
const Song = styled.p`
  cursor: pointer;
`;
const Container = styled.div``;
export default class Audio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      isSongSet: false,
      isSearch: false,
      search: "",
      imageUrl: "",
      data: [],
      tags: [],
      type: "audio",
      editorState: createEditorState()
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.getData = this.getData.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.inputDebounce = debounce(function(e) {
      this.getData();
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
    this.props.unMountChildren("audio");
  }
  async handleInput(e) {
    const name = e.target.name;
    await this.setState({
      [name]: e.target.value
    });
    e.persist();
    this.inputDebounce(e);
  }
  onChange = editorState => {
    this.setState({ editorState });
  };
  handleSend() {
    const content = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    const post = ``;

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
  async getData() {
    const apiCall = await deezerApi(this.state.search);
    this.setState({
      data: apiCall.data,
      isSearch: true
    });
    console.log(this.state.data);
  }
  render() {
    return (
      <Modal style={this.modalStyle} isOpen={this.state.open}>
        <Input
          type="search"
          name="search"
          value={this.state.search}
          placeholder="Search for a song"
          onChange={this.handleInput}
        />

        {this.state.isSearch ? (
          <Container>
            {this.state.data.map(item => {
              return <Song onClick={this.setSong}>{item.title}</Song>;
            })}
          </Container>
        ) : (
          void 0
        )}

        {this.state.isSongSet ? (
          <Editor
            ref="editor"
            placeholder="Something about it..."
            editorState={this.state.editorState}
            onChange={this.onChange}
            sideButtons={[]}
          />
        ) : (
          void 0
        )}
        {this.state.isSongSet ? (
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
