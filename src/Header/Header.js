import React, { Component } from "react";

import Dashboard from "./Dashboard";
import LoginModal from "./LoginModal";
import Register from "../Components/Register";
import { Input } from "rebass";
import { hot } from "react-hot-loader";
import "./Header.css";
import SearchInputMobile from "./SearchInputMobile";
import styled from "styled-components";
import colors from "../styles/colors";
import logo from "../icons/logo.svg";
import SearchInput from "./SearchInput";
const Container = styled.div`
  color: grey;
  display: grid;
  grid-template-columns: 15% 55% 30%;
  align-items: center;
  align-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100vw;
  height: 3.5em;
  z-index: 1000;
  h2 {
    grid-area: logo;
  }
  img {
    transform: scale(0.9, 0.9);
  }
  background-color: ${colors.background};
  grid-template-areas: "logo input buttons";
  @media (max-width: 1024px) {
    grid-template-columns: auto auto auto;

    img {
      transform: scale(0.8, 0.8);
    }
  }
  @media (max-width: 768px) {
    grid-template-areas: "logo input buttons";
    grid-template-columns: auto auto auto;

    h2 {
      font-size: 1em;
    }
  }
  @media (max-width: 425px) {
    grid-template-columns: 30% auto 30%;
    grid-template-areas: "buttons logo input";
    h2 {
      text-align: center;
      font-size: 1em;
    }
  }
  @media (max-width: 375px) {
  }
`;
const LogoContainer = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  grid-area: logo;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  grid-area: buttons;

  button {
    align-self: center;
    width: 68px;
    height: 35px;
    margin-right: 10px;
    font-size: 12px;
    border-radius: 2px;
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 425px) {
    padding-left: 10px;
    button {
      font-size: 8px;
      width: 50px;
      height: 30px;
      margin-right: 0px;
      transform: scale(0.85, 0.85);
    }
  }
  @media (max-width: 375px) {
  }
`;
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: this.props.login
    };
  }

  render() {
    return (
      <Container>
        <LogoContainer>
          <img src={logo} alt="logo" />
        </LogoContainer>
        {window.innerWidth > 425 ? <SearchInput /> : <SearchInputMobile />}

        {this.state.login === true ? (
          <Dashboard />
        ) : (
          <BtnContainer>
            <LoginModal text="Login" />
            <Register />
          </BtnContainer>
        )}
      </Container>
    );
  }
}
export default hot(module)(Header);
