import React, { Component } from "react";
import countActions from "Functions/countActions";
import Modal from "react-modal";
import ActionsList from "./ActionsList";
import styled from "styled-components";

const ActionBtn = styled.button`
  outline: none;
  background-color: #fff;
  cursor: pointer;
  width: 50px;
  height: 25px;
  color: #000;
  border: none;
  :hover {
    transition: 0.2s;
    background-color: rgba(0, 0, 0, 0.1);
  }
  :active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export default class ActionsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      innerWidth: window.innerWidth
    };
  }
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    const { post, steemValue } = this.props;
    const { innerWidth, isOpen } = this.state;
    const modalStyle = {
      content: {
        left: "20px",
        top: "30%",
        overflowY: "hidden",
        overflowX: "hidden",
        display: "flex",
        bottom: "none",
        flexDirection: "column",
        padding: "0",
        maxHeight: "60vh",
        width:
          innerWidth > 768
            ? "20vw"
            : innerWidth <= 768 && innerWidth > 425
              ? "40vw"
              : "65vw"
      },
      overlay: {
        backgroundColor: "transparent"
      }
    };
    return (
      <div>
        <ActionBtn onClick={this.handleOpen}>
          {post.platform === "steem"
            ? "$" + steemValue.toFixed(3)
            : countActions(post)}
        </ActionBtn>

        <Modal
          modal={false}
          isOpen={isOpen}
          onRequestClose={this.handleClose}
          style={modalStyle}
        >
          <ActionsList post={post} />
        </Modal>
      </div>
    );
  }
}
