import React, { Component } from "react";
import { Link } from "react-router-dom";
import { tagStyles, TagContainer } from "../Post.styles";
export default class Tags extends Component {
  render() {
    const { post } = this.props;
    return (
      <TagContainer>
        {post.tags !== undefined &&
        post.platform === "steem" &&
        post.tags.filter(tag => {
          return tag === post.category;
        }).length === 0 ? (
          <Link
            key={post.category}
            style={tagStyles}
            to={`/search/${post.category}/new`}
          >
            #{post.category}
          </Link>
        ) : (
          void 0
        )}
        {post.tags === undefined
          ? "true"
          : post.tags.map(tag => {
              return (
                <Link key={tag} style={tagStyles} to={`/search/${tag}/new`}>
                  #{tag}
                </Link>
              );
            })}
      </TagContainer>
    );
  }
}
