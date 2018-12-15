import React, { Component } from "react";
import CardContent from "./CardContent";
import store from "../../store";
import styled from "styled-components";
import colors from "../../styles/colors";
const Container = styled.div`
  border-bottom: 1px solid ${colors.borders.light};
  margin-bottom: 10px;
`;

export default class RebloggedPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: store.getState().newPost.reblogged_post
    };
  }

  render() {
    const { post } = this.state;
    return (
      <Container>
        <CardContent
          post_type={post.post_type}
          section={"home"}
          text={
            post.steemblr_body === undefined ? post.body : post.steemblr_body
          }
          json_metadata={post.json_metadata}
        />
      </Container>
    );
  }
}
