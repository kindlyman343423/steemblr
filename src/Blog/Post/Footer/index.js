import React, { Component } from "react";
import { FooterContainer } from "../Post.styles.js";
import FooterActions from "./FooterActions";
import Tags from "Components/Post/Footer/Tags";
export default class CardFooter extends Component {
  render() {
    const { post, username, votePercent } = this.props;
    return (
      <FooterContainer>
        <Tags post={post} />
        <FooterActions
          post={post}
          username={username}
          votePercent={votePercent}
        />
      </FooterContainer>
    );
  }
}
