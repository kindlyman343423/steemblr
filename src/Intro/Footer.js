import React, { Component } from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { github } from "react-icons-kit/icomoon/github";
import { bubbles2 } from "react-icons-kit/icomoon/bubbles2";
import { newspaper } from "react-icons-kit/icomoon/newspaper";
const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
  padding: 25px;
  display: flex;
  flex-direction: row;
  a {
    color: #fff;
    padding-right: 5px;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;
export default class Footer extends Component {
  render() {
    return (
      <Container>
        <a
          href="https://github.com/snwolak/steemblr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={github} size={24} />
        </a>
        <a
          href="https://steemit.com/@snwolak"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={newspaper} size={24} />
        </a>
        <a
          href="https://discord.gg/hHmZgk6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon={bubbles2} size={24} />
        </a>
      </Container>
    );
  }
}
