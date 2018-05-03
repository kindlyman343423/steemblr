import React, { Component } from "react";
import ReactDOM from "react-dom";
import { MdFormatAlignLeft } from "react-icons/lib/md/";
import Modal from "react-modal";
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

export default class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillUnmount() {
    this.setState({
      open: true
    });
  }
  handleOpen() {
    this.setState({
      open: true
    });
  }
  handleClose() {
    this.setState({
      open: false,
      isOpen: true
    });
    this.props.unMountChildren("text");
  }
  handleClick() {}
  render() {
    return (
      <Modal
        isOpen={this.state.open}
        onRequestClose={this.handleClose}
        style={modalStyle}
      >
        <MdFormatAlignLeft size={50} />
        <MdFormatAlignLeft size={50} />
        <MdFormatAlignLeft size={50} />
        <MdFormatAlignLeft size={50} />
        <MdFormatAlignLeft size={50} />
      </Modal>
    );
  }
}
