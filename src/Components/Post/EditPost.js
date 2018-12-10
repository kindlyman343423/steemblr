import React, { Component } from "react";
import styled from "styled-components";

import PostCreator from "../../NewPost/";

import store from "../../store";
import newPostType from "../../actions/newPostType";
import newPostBody from "../../actions/newPostBody";
import newPostTitle from "../../actions/newPostTitle";
import newPostTags from "../../actions/newPostTags";
import { existingPostPermlink } from "../../actions/newPostPermlink";
import { newPostPhoto } from "../../actions/newPostPhoto";
import { newPostVideo } from "../../actions/newPostVideo";
import { newPostAudio } from "../../actions/newPostAudio";
import { newPostQuote, newPostQuoteSource } from "../../actions/newPostQuote";
import {
  newPostModal,
  newPostForm,
  newPostIsError,
  editingExistingPost
} from "../../actions/newPostInterface";
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
    store.dispatch(
      newPostBody(
        this.props.post.steemblr_body === undefined
          ? this.props.post.body
          : this.props.post.steemblr_body
      )
    );
    store.dispatch(newPostTitle(this.props.post.title));
    store.dispatch(newPostTags(this.props.post.tags));
    if (
      this.props.post.post_type === "photos" ||
      this.props.post.post_type === "gifs"
    ) {
      const photo = JSON.parse(this.props.post.json_metadata).image;
      store.dispatch(newPostPhoto(photo));
    } else if (this.props.post.post_type === "video") {
      store.dispatch(newPostVideo(this.props.post.video));
    } else if (this.props.post.post_type === "audio") {
      store.dispatch(newPostAudio(this.props.post.audio));
    } else if (this.props.post.post_type === "quote") {
      store.dispatch(newPostQuote(this.props.post.quote));
      store.dispatch(newPostQuoteSource(this.props.post.quoteSource));
    }
    store.dispatch(newPostForm(true));
    store.dispatch(newPostIsError(false));
    store.dispatch(editingExistingPost(true));
    store.dispatch(existingPostPermlink(this.props.post.root_permlink));
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
          size={20}
          onClick={() => this.handleNewModal(this.props.post.post_type)}
        />
      </Container>
    );
  }
}
