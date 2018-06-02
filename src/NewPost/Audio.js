import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TagsInput from "react-tagsinput";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import { Editor, createEditorState } from "medium-draft";
import newPost from "../Functions/newPost";
import mediumDraftExporter from "medium-draft/lib/exporter";
import deezerApi from "../Functions/deezerApi";
import deezerIcon from "../icons/deezer.ico";
import { debounce } from "lodash";
const Input = styled.input`
  padding: 5px;
  border: 0;
  outline: 0;
  margin-bottom: 10px;
`;
const Song = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
  b {
    font-weight: 500;
    padding-right: 5px;
  }
  img {
    height: 16px;
    padding-right: 5px;
  }
`;
const Container = styled.div`
  position: relative;
  min-height: 350px;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    height: 100%;
  }
`;
export default class Audio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      innerWidth: window.innerWidth,
      isSongSet: false,
      isSearch: false,
      songTitle: "",
      songId: "",
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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setSong = this.setSong.bind(this);
    this.inputDebounce = debounce(async function(e) {
      await this.getData();
    }, 200);
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
    this.props.unMountChildren("audio");
  }
  async handleInput(e) {
    if (e.target.value === "") {
      await this.setState({
        isSearch: false,
        isSongSet: false,
        search: ""
      });
      return void 0;
    }
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
    const post = `
    <iframe
    title={this.state.songTitle}
    scrolling="no"
    frameBorder="0"
    allowtransparency="true"
    src=${`https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=300&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${
      this.state.songId
    }&app_id=1`}
  /> ${content}`;

    newPost(
      this.state.user,
      this.state.title,
      post,
      this.state.tags,
      this.state.type
    );
  }
  setSong(props) {
    this.setState({
      songId: props.id,
      songTitle: props.title,
      isSongSet: true,
      isSearch: false
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
  async getData() {
    const apiCall = await deezerApi(this.state.search);
    await this.setState({
      data: apiCall.data,
      isSearch: true
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
              return (
                <Song key={item.id} onClick={() => this.setSong(item)}>
                  <img src={deezerIcon} alt="logo" />
                  <b>{item.title}</b> <span>{item.artist.name}</span>
                </Song>
              );
            })}
          </Container>
        ) : (
          void 0
        )}
        {this.state.isSongSet ? (
          <Container>
            <iframe
              title={this.state.songTitle}
              scrolling="no"
              frameBorder="0"
              allowtransparency="true"
              src={`https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=300&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${
                this.state.songId
              }&app_id=1`}
            />
          </Container>
        ) : (
          void 0
        )}
        {this.state.isSongSet ? (
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
