import React, { Component } from "react";
import Remarkable from "remarkable";
import sanitizeHtml from "sanitize-html";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import postAllowedHtml from "../../Functions/postAllowedHtml";
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
  a {
    word-wrap: break-word;
  }
`;
const md = new Remarkable("full");
md.set({
  html: true,
  linkify: true
});
export default class CardText extends Component {
  parseContent() {
    return ReactHtmlParser(
      sanitizeHtml(md.render(this.props.text), {
        allowedTags: postAllowedHtml(this.props.post_type),
        transformTags: {
          a: function(tagName, attribs) {
            const re = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/i;
            if (re.test(attribs.href)) {
              return {
                tagName: "img",
                attribs: {
                  src: attribs.href
                },
                text: ""
              };
            }
            return {
              tagName: "a",
              attribs: {
                href: attribs.href
              }
            };
          }
        }
      })
    );
  }
  render() {
    return <Container>{this.parseContent()}</Container>;
  }
}
