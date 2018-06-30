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
const Container = styled.div`
  background-color: #00796b;
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
class Intro extends Component {
  render() {
    return (
      <Container>
        {store.getState().login.status ? <Redirect to="/home" /> : void 0}
        <Header />
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
