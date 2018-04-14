import React, { Component } from 'react'
import { MdInsertComment } from 'react-icons/lib/md/'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Input } from 'rebass'

import { MdSend } from 'react-icons/lib/md/'

import Comment from './Comment'
import getContentReplies from '.././Functions/getContentReplies'


const styles = {
  radioButton: {
    marginTop: 16,
  },
};
const dialogTitleStyle = {
  fontSize: '16px',
  fontWeight: '500'
}
const dialogStyle = {
  width: '30vw',
  height: '10vh'
}
const actionsStyle = {
  display: 'inline-flex',
  alignItems: 'center'
}
export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      comments: []
    }
    this.handleOpen = this.handleOpen.bind(this)
  }
  handleOpen = async () => {
    const apiCall = await getContentReplies(this.props.author, this.props.permlink)

    this.setState({
      comments: apiCall[0],
      open: true
    });
    console.log(this.state.comments)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <Input bg='white' color="black"  placeholder="Reply"/>,
      <MdSend size={24}/>
    ]
    return (
      <span>
        <MdInsertComment size={20} onClick={this.handleOpen} />
        <Dialog
          title={this.props.likesNumber + ' Likes ' + this.state.comments.length + ' Comments'}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          style={dialogStyle}
          actions={actions}
          titleStyle={dialogTitleStyle}
          actionsContainerStyle={actionsStyle}
        >
          {this.state.comments.map((comment) => {
            return <Comment author={comment.author} body={comment.body} />
          })}
        </Dialog>
      </span>
    )
  }
}
