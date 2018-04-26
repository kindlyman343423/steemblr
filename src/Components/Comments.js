import React, { Component } from "react";
import { MdInsertComment } from "react-icons/lib/md/";
import Dialog from "material-ui/Dialog";

import { Input } from "rebass";
import { MdSend } from "react-icons/lib/md/";
import Comment from "./Comment";
import getContentReplies from ".././Functions/getContentReplies";
import sendComment from ".././Functions/sendComment";
import uuidv4 from "uuid/v4";

const dialogTitleStyle = {
  fontSize: "16px",
  fontWeight: "500"
};
const dialogStyle = {
  width: "30vw",
  height: "10vh"
};
const actionsStyle = {
  display: "inline-flex",
  alignItems: "center"
};
export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      comments: [],
      comment: ""
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSendComment = this.handleSendComment.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleOpen = async () => {
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );

    this.setState({
      comments: apiCall[0],
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSendComment() {
    if (this.state.comment === "") {
      alert("Comment can't be empty");
    }
    sendComment(
      this.props.postAuthor,
      this.props.postPermlink,
      this.props.username,
      this.state.comment,
      uuidv4()
    );
    this.setState({
      comment: ""
    });
  }
  handleInputChange(e) {
    const target = e.target;
    let value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render() {
    const actions = [
      <Input
        bg="white"
        color="black"
        placeholder="Reply"
        name="comment"
        value={this.state.comment}
        onChange={this.handleInputChange}
      />,
      <MdSend size={24} onClick={this.handleSendComment} />
    ];
    return (
      <span>
        <MdInsertComment size={20} onClick={this.handleOpen} />
        <Dialog
          title={
            this.props.likesNumber +
            " Likes " +
            this.state.comments.length +
            " Comments"
          }
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          style={dialogStyle}
          actions={actions}
          titleStyle={dialogTitleStyle}
          actionsContainerStyle={actionsStyle}
        >
          {this.state.comments.map(comment => {
            return (
              <Comment
                author={comment.author}
                body={comment.body}
                key={uuidv4()}
              />
            );
          })}
        </Dialog>
      </span>
    );
  }
}
