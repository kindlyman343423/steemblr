import React, { Component } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import colors from "../styles/colors";
import LoginModal from "../Header/LoginModal";
import Register from "../Components/Register";
import Header from "./Header";
import { Link, Redirect } from "react-router-dom";
import logo from "../icons/logo.svg";
import store from "../store";
import Logo from "../Components/Logo";
const Container = styled.div`
  background-color: #06162b;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    transform: scale(1.5, 1.5);
    margin-bottom: 20px;
  }
  a {
    color: ${colors.font.lightNormal};
  }
`;
const BtnContainer = styled.div`
  button {
    width: 250px;
    margin-bottom: 15px;
  }
`;
const LogoContainer = styled.div`
  svg {
    height: 128px;
    width: auto;
    margin-bottom: -10px;
    animation: colorChange 5s infinite;
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
class Intro extends Component {
  render() {
    return (
      <Container>
        {store.getState().login.status ? <Redirect to="/home" /> : void 0}
        <Header />
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <img src={logo} alt="logo" />
        <BtnContainer>
          <LoginModal text="Login with steemconnect" />
          <Register />
        </BtnContainer>
        <Link to="explore/trending/">Check what's trending</Link>
      </Container>
    );
  }
}

export default hot(module)(Intro);
