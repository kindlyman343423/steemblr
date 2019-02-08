import React, { Component } from "react";
import styled from "styled-components";

import PostCreator from "NewPost/";

import store from "../../../store";
import newPostType from "actions/newPostType";
import newPostBody from "actions/newPostBody";
import newPostTitle from "actions/newPostTitle";
import newPostTags from "actions/newPostTags";
import {
  existingPostPermlink,
  existingPostParentPermlink
} from "actions/newPostPermlink";
import { newPostPhoto } from "actions/newPostPhoto";
import { newPostVideo } from "actions/newPostVideo";
import { newPostAudio } from "actions/newPostAudio";
import { newPostQuote, newPostQuoteSource } from "actions/newPostQuote";
import {
  newPostModal,
  newPostForm,
  newPostIsError,
  editingExistingPost,
  newPostIsReblogging
} from "actions/newPostInterface";
import Icon from "react-icons-kit";

import { ic_edit } from "react-icons-kit/md/ic_edit";
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
    const { post } = this.props;
    store.dispatch(
      newPostBody(
        post.steemblr_body === undefined ? post.body : post.steemblr_body
      )
    );
    store.dispatch(newPostTitle(post.title));
    store.dispatch(newPostTags(post.tags));
    if (post.post_type === "photos" || post.post_type === "gifs") {
      store.dispatch(newPostPhoto(post.photo));
    } else if (post.post_type === "video") {
      store.dispatch(newPostVideo(post.video));
    } else if (post.post_type === "audio") {
      store.dispatch(newPostAudio(post.audio));
    } else if (post.post_type === "quotes") {
      store.dispatch(newPostQuote(post.quote));
      store.dispatch(newPostQuoteSource(post.quoteSource));
    }
    store.dispatch(newPostIsReblogging(false));
    store.dispatch(newPostForm(true));
    store.dispatch(newPostIsError(false));
    store.dispatch(editingExistingPost(true));
    store.dispatch(existingPostPermlink(post.permlink));
    if (post.platform === "steem") {
      store.dispatch(existingPostParentPermlink(post.parent_permlink));
    }
    this.setState({
      open: false,
      [name]: true,
      postCreator: true
    });
    if (name === "text") {
      store.dispatch(newPostForm(true));
    }
    store.dispatch(newPostType(name));
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
          icon={ic_edit}
          size={30}
          onClick={() => this.handleNewModal(this.props.post.post_type)}
        />
      </Container>
    );
  }
}
