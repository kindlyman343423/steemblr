import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import colors from "../styles/colors";
import {
  MdBorderColor,
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
    transform: translate3d(0px, 1px, 0px);
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
  }

  render() {
    return (
      <Container>
        <IconDiv style={{ color: colors.postTypes.text }}>
          <MdFormatAlignLeft size={32} />
          <span>Text</span>
        </IconDiv>
        <IconDiv style={{ color: colors.postTypes.photo }}>
          <MdCameraAlt size={32} />
          <span>Photo</span>
        </IconDiv>
        <IconDiv style={{ color: colors.postTypes.quote }}>
          <MdFormatQuote size={32} />
          <span>Quote</span>
        </IconDiv>

        <IconDiv style={{ color: colors.postTypes.audio }}>
          <MdMusicNote size={32} />
          <span>Audio</span>
        </IconDiv>
        <IconDiv style={{ color: colors.postTypes.video }}>
          <MdVideocam size={32} />
          <span>Video</span>
        </IconDiv>
      </Container>
    );
  }
}
