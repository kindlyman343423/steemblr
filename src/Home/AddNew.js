import React, { Component } from "react";
import styled from "styled-components";

import PostCreator from "../NewPost/";
import colors from "../styles/colors";
import store from "../store";
import newPostType from "../actions/newPostType";
import {
  newPostModal,
  newPostForm,
  newPostIsError,
  editingExistingPost,
  newPostIsReblogging
} from "../actions/newPostInterface";
import Icon from "react-icons-kit";
import { ic_camera_alt } from "react-icons-kit/md/ic_camera_alt";
import { ic_format_quote } from "react-icons-kit/md/ic_format_quote";
import { ic_format_align_left } from "react-icons-kit/md/ic_format_align_left";
import { ic_music_note } from "react-icons-kit/md/ic_music_note";
import { ic_videocam } from "react-icons-kit/md/ic_videocam";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  padding: 25px;
  @media (max-width: 425px) {
    padding: 15px;
  }
  @media (max-width: 375px) {
    padding: 10px;
  }
`;
const IconDiv = styled.div`
  svg: {
    margin-right: 0px;
  }
  span: {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  border-radius: 5px;
  color: black;
  text-align: center;
  padding: 5px;
  cursor: pointer;

  transition: 0.5s;
  &:hover {
    transform: translate3d(0px, -2px, 0px);
    transition: 0.2s;
  }
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
    store.dispatch(editingExistingPost(false));
    store.dispatch(newPostForm(false));
    store.dispatch(newPostIsError(false));
    store.dispatch(newPostIsReblogging(false));
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
        <IconDiv
          style={{ color: colors.postTypes.text }}
          onClick={() => this.handleNewModal("text")}
        >
          <Icon icon={ic_format_align_left} size={32} />
          <span>Text</span>
        </IconDiv>
        <IconDiv
          style={{ color: colors.postTypes.photo }}
          onClick={() => this.handleNewModal("photos")}
        >
          <Icon icon={ic_camera_alt} size={32} />
          <span>Photo</span>
        </IconDiv>
        <IconDiv
          style={{ color: colors.postTypes.quote }}
          onClick={() => this.handleNewModal("quotes")}
        >
          <Icon icon={ic_format_quote} size={32} />
          <span>Quote</span>
        </IconDiv>

        <IconDiv
          style={{ color: colors.postTypes.audio }}
          onClick={() => this.handleNewModal("audio")}
        >
          <Icon icon={ic_music_note} size={32} />
          <span>Audio</span>
        </IconDiv>
        <IconDiv
          style={{ color: colors.postTypes.video }}
          onClick={() => this.handleNewModal("video")}
        >
          <Icon icon={ic_videocam} size={32} />
          <span>Video</span>
        </IconDiv>
      </Container>
    );
  }
}
