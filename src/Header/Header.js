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

const Container = styled.div`
  color: grey;
  display: grid;
  grid-template-columns: 10% 60% 30%;
  align-items: center;
  align-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100vw;
  height: 3.5em;
  z-index: 1000;
  h2 {
    grid-area: logo;
  }

  background-color: ${colors.background};
  grid-template-areas: "logo input buttons";
  @media (max-width: 1024px) {
    grid-template-columns: 10% 50% 40%;
    h2 {
      font-size: 1.2em;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 10% 50% 40%;

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
    input {
    }
  }
  @media (max-width: 375px) {
  }
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  align-content: flex-end;
  justify-content: center;
  grid-area: buttons;

  button {
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
      margin-right: 5px;
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
        <h2 className="logo">steemblr</h2>

        {window.innerWidth > 425 ? (
          <Input bg="white" color="black" placeholder="Search" />
        ) : (
          <SearchInputMobile />
        )}

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
