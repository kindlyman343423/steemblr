import React, { Component } from "react";
import styled from "styled-components";
import Text from "../NewPost/Text";
import Photo from "../NewPost/Photo";
import Quote from "../NewPost/Quote";
import Audio from "../NewPost/Audio";
import Video from "../NewPost/Video";
import colors from "../styles/colors";
import {
  MdFormatQuote,
  MdCameraAlt,
  MdFormatAlignLeft,
  MdMusicNote,
  MdVideocam
} from "react-icons/lib/md/";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 25px;
  border-radius: 1%;
`;
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
  border-radius: 5px;
  color: black;
  text-align: center;
  padding: 5px;
  cursor: pointer;

  transition: 0.5s;
  &:hover {
    transform: translate3d(0px, -2px, 0px);
    transition: 0.2s;
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
      quote: false,
      video: false
    };
    this.handleNewModal = this.handleNewModal.bind(this);
    this.unMountChildren = this.unMountChildren.bind(this);
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
      <Container>
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
        <IconDiv
          style={{ color: colors.postTypes.text }}
          onClick={() => this.handleNewModal("text")}
        >
          <MdFormatAlignLeft size={32} />
          <span>Text</span>
        </IconDiv>
        <IconDiv
          style={{ color: colors.postTypes.photo }}
          onClick={() => this.handleNewModal("photo")}
        >
          <MdCameraAlt size={32} />
          <span>Photo</span>
        </IconDiv>
        <IconDiv
          style={{ color: colors.postTypes.quote }}
          onClick={() => this.handleNewModal("quote")}
        >
          <MdFormatQuote size={32} />
          <span>Quote</span>
        </IconDiv>

        <IconDiv
          style={{ color: colors.postTypes.audio }}
          onClick={() => this.handleNewModal("audio")}
        >
          <MdMusicNote size={32} />
          <span>Audio</span>
        </IconDiv>
        <IconDiv
          style={{ color: colors.postTypes.video }}
          onClick={() => this.handleNewModal("video")}
        >
          <MdVideocam size={32} />
          <span>Video</span>
        </IconDiv>
      </Container>
    );
  }
}
