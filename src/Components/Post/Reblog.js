import React, { Component } from "react";
import styled from "styled-components";

import PostCreator from "../../NewPost/";

import store from "../../store";
import newPostType from "../../actions/newPostType";

import {
  newPostModal,
  newPostForm,
  newPostIsError,
  editingExistingPost,
  newPostIsReblogging
} from "../../actions/newPostInterface";
import { putRebloggedPost } from "../../actions/newPostBody";
import { existingPostPermlink } from "../../actions/newPostPermlink";
import Icon from "react-icons-kit";

import { ic_repeat } from "react-icons-kit/md/ic_repeat";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  cursor: pointer;
`;

export default class AddNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      postCreator: false
    };
    this.handleNewModal = this.handleNewModal.bind(this);
    this.unMountChildren = this.unMountChildren.bind(this);
  }
  handleNewModal(name) {
    store.dispatch(newPostForm(true));
    store.dispatch(newPostIsError(false));
    store.dispatch(editingExistingPost(false));
    store.dispatch(newPostIsReblogging(true));
    store.dispatch(existingPostPermlink(this.props.permlink));
    this.setState({
      open: false,
      [name]: true,
      postCreator: true
    });

    store.dispatch(newPostType(name));
    store.dispatch(putRebloggedPost(this.props.post));
    store.dispatch(newPostModal(true));
  }
  unMountChildren(name) {
    this.setState({
      [name]: false
    });
  }
  render() {
    return (
      <Container>
        {this.state.postCreator === true && (
          <PostCreator unMountChildren={this.unMountChildren} />
        )}

        <Icon
          icon={ic_repeat}
          size={20}
          onClick={() => this.handleNewModal("text")}
        />
      </Container>
    );
  }
}
