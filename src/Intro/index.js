import React, { Component } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import colors from "../styles/colors";
import LoginModal from "../Header/LoginModal";
import Register from "../Components/Register";
import Header from "./Header";
import { Link } from "react-router-dom";
const LoginBtn = styled.button`
  padding: 10px;
  border: 0;
  background-color: transparent;
  outline: none;

  font-weight: 700;
  transition: 0.5s;
  &:hover {
    background-color: #808e95;
    transition: 0.5s;
  }
`;
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
  h2 {
    color: white;
    font-size: 32px;
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
        <Header />
        <h2>steemblr</h2>
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
