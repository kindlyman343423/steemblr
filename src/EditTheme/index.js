import React, { Component } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Blog from "../Blog/";
const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 25% auto;
`;
const BlogContainer = styled.div`
  display: block;
  overflow-y: scroll;
  max-height: 100vh;
`;
export default class EditTheme extends Component {
  render() {
    return (
      <Container>
        <Menu />
        <BlogContainer>
          <Blog {...this.props} />
        </BlogContainer>
      </Container>
    );
  }
}
