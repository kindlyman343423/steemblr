import LoginBtn from "../Components/LoginBtn";
import Register from "../Components/RegisterBtn";
import React, { Component } from "react";
import styled from "styled-components";
import AnchorLink from "react-anchor-link-smooth-scroll";
const Container = styled.div`
  box-sizing: border-box;

  position: fixed;
  right: 0;
  padding: 25px;
  z-index: 20;
  display: flex;
  flex-direction: row;
  button {
    margin-left: 15px;
  }
  animation: fadein 2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 425px) {
    display: none;
  }
`;
export default class Buttons extends Component {
  render() {
    return (
      <Container>
        <AnchorLink href="#welcome-section">
          <LoginBtn>Login</LoginBtn>
        </AnchorLink>
        <AnchorLink href="#welcome-section">
          <Register>Sign Up</Register>
        </AnchorLink>
      </Container>
    );
  }
}
