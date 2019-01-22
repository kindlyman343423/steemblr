import React, { Component } from "react";
import CardAvatar from "../../Components/Post/CardAvatar";
import store from "../../store";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { ic_repeat } from "react-icons-kit/md/ic_repeat";
const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 10px 10px 10px;
  margin-top: -10px;
  b {
    font-weight: 500;
    padding-left: 10px;
  }
`;
export default class PostHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: store.getState().login.username,
      platform: store.getState().login.platform,
      isReblogged: store.getState().newPostInterface.isReblogged,
      rebloggedAuthor: store.getState().newPost.reblogged_post.author,
      rebloggedPost: store.getState().newPost.reblogged_post
    };
  }

  render() {
    const { author, isReblogged, rebloggedAuthor, platform } = this.state;
    return (
      <CardHeader>
        <CardAvatar author={author} platform={platform} />
        <b>{author}</b>
        {isReblogged && (
          <span>
            <Icon
              icon={ic_repeat}
              size={20}
              onClick={() => this.handleNewModal("text")}
            />
            {rebloggedAuthor}
          </span>
        )}
      </CardHeader>
    );
  }
}
