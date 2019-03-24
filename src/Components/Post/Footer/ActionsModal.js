import React, { Component } from "react";
import countActions from "Functions/countActions";
import Modal from "react-modal";
import ActionsList from "./ActionsList";
import ActionBtn from "Components/ActionBtn";

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
            ? "25vw"
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
