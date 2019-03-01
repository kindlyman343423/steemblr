import React, { Component } from "react";

import Dashboard from "./Dashboard";

import Register from "../Components/RegisterBtn";
import { hot } from "react-hot-loader";
import "./Header.css";
import styled from "styled-components";
import colors from "../styles/colors";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../Components/Logo";
import LoginBtn from "../Components/LoginBtn";
const Container = styled.div`
  color: grey;
  display: grid;
  grid-template-columns: 5% 65% 30%;
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
    grid-template-columns: 5% 65% 30%;

    img {
      transform: scale(0.8, 0.8);
    }
  }
  @media (max-width: 768px) {
    grid-template-areas: "logo input buttons";
    grid-template-columns: 6% 64% 30%;

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
  a {
    display: flex;
    justify-content: center;
    svg {
      height: 45px;
      width: auto;
      transition: 0.5s;
      &:hover {
        filter: hue-rotate(60deg);
      }
    }
  }
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
    padding-left: 20px;
    button {
      font-size: 8px;
      width: 60px;
      height: 30px;
      margin-right: 0px;
      transform: scale(0.85, 0.85);
    }
  }
  @media (max-width: 375px) {
  }
`;
class Header extends Component {
  render() {
    const { login } = this.props;
    return (
      <Container>
        <LogoContainer>
          <Link to="/">
            <Logo />
          </Link>
        </LogoContainer>
        <SearchInput />
        {login.status === true ? (
          <Dashboard />
        ) : (
          <BtnContainer>
            <Link to="/">
              <LoginBtn>Login</LoginBtn>
            </Link>
            <Link to="/">
              <Register>Sign Up</Register>
            </Link>
          </BtnContainer>
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login
});

export default connect(
  mapStateToProps,
  {}
)(hot(module)(Header));
