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
const divColors = {};
const iconDiv = {
  base: {
    svg: {
      marginRight: 0
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    justifyItems: "center",
    color: "white",
    textAlign: "center",
    padding: "5px",
    cursor: "pointer",
    height: "100px",
    width: "100px",
    borderRadius: "20px",
    margin: "20px"
  },
  colors: {
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
          <div style={Object.assign({}, iconDiv.base, iconDiv.colors.violet)}>
            <MdFormatAlignLeft size={50} />
            <span style={{ width: "100%" }}>Text</span>
          </div>
          <div style={Object.assign({}, iconDiv.base, iconDiv.colors.blue)}>
            <MdCameraAlt size={50} />
            <span style={{ width: "100%" }}>Photo</span>
          </div>
          <div style={Object.assign({}, iconDiv.base, iconDiv.colors.green)}>
            <MdFormatQuote size={50} />
            <span style={{ width: "100%" }}>Quote</span>
          </div>

          <div style={Object.assign({}, iconDiv.base, iconDiv.colors.orange)}>
            <MdMusicNote size={50} />
            <span style={{ width: "100%" }}>Audio</span>
          </div>
          <div style={Object.assign({}, iconDiv.base, iconDiv.colors.bronze)}>
            <MdVideocam size={50} />
            <span style={{ width: "100%" }}>Video</span>
          </div>
        </Modal>
      </div>
    );
  }
}
