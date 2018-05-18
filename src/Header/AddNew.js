import React, { Component } from "react";
import Text from "../NewPost/Text";
import Photo from "../NewPost/Photo";
import Quote from "../NewPost/Quote";
import Audio from "../NewPost/Audio";
import Video from "../NewPost/Video";
import styled from "styled-components";
import {
  MdBorderColor,
  MdFormatQuote,
  MdCameraAlt,
  MdFormatAlignLeft,
  MdMusicNote,
  MdVideocam
} from "react-icons/lib/md/";
import Modal from "react-modal";
import colors from "../styles/colors";
const modalStyle = {
  postion: "fixed",
  height: "100%",
  overlay: {
    backgroundColor: "rgba(28, 49, 58, 0.95)"
  },
  content: {
    top: "30%",
    bottom: "none",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "0"
  }
};
const IconDiv = styled.div`
  svg: {
    margin-right: 0px;
  }
  span: {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  color: white;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  height: 100px;
  width: 100px;
  border-radius: 20px;
  margin: 20px;
  transition: 0.5s;
  &:hover {
    transform: translate3d(0px, 4px, 0px);
    transition: 0.5s;
  }
`;

export default class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      text: false,
      photo: false,
      audio: false,
      video: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNewModal = this.handleNewModal.bind(this);
    this.unMountChildren = this.unMountChildren.bind(this);
  }
  handleOpen() {
    this.setState({
      open: true,
      text: false,
      photo: false
    });
  }
  handleClose() {
    this.setState({
      open: false
    });
  }
  handleNewModal(name) {
    this.setState({
      open: false,
      [name]: true
    });
  }
  unMountChildren(name) {
    this.setState({
      [name]: false
    });
  }
  render() {
    return (
      <div>
        <MdBorderColor
          className="dashboardIcon"
          size={24}
          onClick={this.handleOpen}
        />
        {this.state.text === true ? (
          <Text isOpen={true} unMountChildren={this.unMountChildren} />
        ) : (
          void 0
        )}
        {this.state.photo === true ? (
          <Photo isOpen={true} unMountChildren={this.unMountChildren} />
        ) : (
          void 0
        )}
        {this.state.quote === true ? (
          <Quote isOpen={true} unMountChildren={this.unMountChildren} />
        ) : (
          void 0
        )}
        {this.state.audio === true ? (
          <Audio isOpen={true} unMountChildren={this.unMountChildren} />
        ) : (
          void 0
        )}
        {this.state.video === true ? (
          <Video isOpen={true} unMountChildren={this.unMountChildren} />
        ) : (
          void 0
        )}
        <Modal
          isOpen={this.state.open}
          onRequestClose={this.handleClose}
          style={modalStyle}
        >
          <IconDiv
            style={{ backgroundColor: colors.postTypes.text }}
            onClick={() => this.handleNewModal("text")}
          >
            <MdFormatAlignLeft size={50} />
            <span>Text</span>
          </IconDiv>

          <IconDiv
            style={{ backgroundColor: colors.postTypes.photo }}
            onClick={() => this.handleNewModal("photo")}
          >
            <MdCameraAlt size={50} />
            <span>Photo</span>
          </IconDiv>
          <IconDiv
            style={{ backgroundColor: colors.postTypes.quote }}
            onClick={() => this.handleNewModal("quote")}
          >
            <MdFormatQuote size={50} />
            <span>Quote</span>
          </IconDiv>

          <IconDiv
            style={{ backgroundColor: colors.postTypes.audio }}
            onClick={() => this.handleNewModal("audio")}
          >
            <MdMusicNote size={50} />
            <span>Audio</span>
          </IconDiv>
          <IconDiv
            style={{ backgroundColor: colors.postTypes.video }}
            onClick={() => this.handleNewModal("video")}
          >
            <MdVideocam size={50} />
            <span>Video</span>
          </IconDiv>
        </Modal>
      </div>
    );
  }
}
