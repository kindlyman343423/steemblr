import React, { Component } from "react";
import { FooterContainer } from "../Post.styles.js";
import SteemFooterActions from "./Steem/FooterActions";
import Tags from "./Tags";
export default class CardFooter extends Component {
  render() {
    const { post, username, votePercent } = this.props;
    return (
      <FooterContainer>
        <Tags post={post} />
        {post.platform === "steem" && (
          <SteemFooterActions
            post={post}
            username={username}
            votePercent={votePercent}
          />
        )}
      </FooterContainer>
    );
  }
}
