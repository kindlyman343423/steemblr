import React, { Component } from "react";
import Remarkable from "remarkable";
import sanitizeHtml from "sanitize-html";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import postAllowedHtml from "../Functions/postAllowedHtml";
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 500;
  }
`;
const md = new Remarkable({
  html: true,
  linkify: true
});
export default class CardText extends Component {
  parseContent() {
    return ReactHtmlParser(
      sanitizeHtml(md.render(this.props.text), {
        allowedTags: postAllowedHtml(this.props.post_type)
      })
    );
  }
  render() {
    return <Container>{this.parseContent()}</Container>;
  }
}
