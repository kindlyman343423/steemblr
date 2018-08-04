import React, { Component } from "react";
import styled from "styled-components";
import Logo from "./Logo";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
  svg {
    height: 128px;
    width: auto;
    margin-bottom: -10px;
    animation: colorChange 2s infinite;
  }
  @keyframes colorChange {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

class LoadingSpin extends Component {
  render() {
    return (
      <Container>
        <Logo />
      </Container>
    );
  }
}

export default LoadingSpin;
