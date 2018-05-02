import React, { Component } from "react";
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

const modalStyle = {
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

const colors = {
  violet: {
    backgroundColor: "#65499c"
  },
  blue: {
    backgroundColor: "#0093c4"
  },
  green: {
    backgroundColor: "#a8b545"
  },
  orange: {
    backgroundColor: "#c88719"
  },
  bronze: {
    backgroundColor: "#725b53"
  }
};

export default class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  }
  render() {
    return (
      <div>
        <MdBorderColor
          className="dashboardIcon"
          size={24}
          onClick={this.handleOpen}
        />

        <Modal
          isOpen={this.state.open}
          onRequestClose={this.handleClose}
          style={modalStyle}
        >
          <IconDiv style={colors.violet}>
            <MdFormatAlignLeft size={50} />
            <span style={{ width: "100%" }}>Text</span>
          </IconDiv>
          <IconDiv style={colors.blue}>
            <MdCameraAlt size={50} />
            <span style={{ width: "100%" }}>Photo</span>
          </IconDiv>
          <IconDiv style={colors.green}>
            <MdFormatQuote size={50} />
            <span style={{ width: "100%" }}>Quote</span>
          </IconDiv>

          <IconDiv style={colors.orange}>
            <MdMusicNote size={50} />
            <span style={{ width: "100%" }}>Audio</span>
          </IconDiv>
          <IconDiv style={colors.bronze} onMouseEnter={e => console.log(e)}>
            <MdVideocam size={50} />
            <span style={{ width: "100%" }}>Video</span>
          </IconDiv>
        </Modal>
      </div>
    );
  }
}
