import React, { Component } from "react";
import Remarkable from "remarkable";
import sanitizeHtml from "sanitize-html";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
`;
const md = new Remarkable({
  html: true,
  linkify: true
});
export default class CardText extends Component {
  parseContent() {
    return ReactHtmlParser(
      sanitizeHtml(md.render(this.props.text), {
        allowedTags: [
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "p",
          "a",
          "ul",
          "ol",
          "nl",
          "li",
          "b",
          "i",
          "strong",
          "em",
          "strike",
          "code",
          "hr",
          "br",
          "div",
          "table",
          "thead",
          "caption",
          "tbody",
          "tr",
          "th",
          "td",
          "pre"
        ]
      })
    );
  }
  render() {
    return <Container>{this.parseContent()}</Container>;
  }
}
