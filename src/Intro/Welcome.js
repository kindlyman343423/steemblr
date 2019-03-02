import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { Link } from "react-router-dom";
import LoginBtn from "../Components/LoginBtn";
import RegisterBtn from "../Components/RegisterBtn";
import logo from "../icons/logo.svg";
import Logo from "../Components/Logo";
import { Waypoint } from "react-waypoint";
import Register from "./Register/";
import Login from "./Login/";
const Container = styled.section`
  box-sizing: border-box;
  background: #06162b;

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  a {
    color: ${colors.font.lightNormal};
  }
  z-index: 3;
`;
const Steemblr = styled.img`
  transform: scale(1.5);
  height: auto;
  margin-bottom: 20px;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
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
export default class Welcome extends Component {
  constructor(props) {
    super();
    this.state = {
      formToLoad: ""
    };
  }

  handleForm = props => {
    this.setState({
      formToLoad: props
    });
  };
  loadForm = () => {
    switch (this.state.formToLoad) {
      case "login": {
        return <Login handleForm={this.handleForm} />;
      }
      case "register": {
        return <Register handleForm={this.handleForm} />;
      }
      default:
        return (
          <BtnContainer>
            <LoginBtn onClick={() => this.handleForm("login")}>Login</LoginBtn>
            <RegisterBtn onClick={() => this.handleForm("register")}>
              Sign Up
            </RegisterBtn>

            <Link to="explore/trending/">Check what's trending</Link>
          </BtnContainer>
        );
    }
  };
  render() {
    return (
      <Container id="welcome-section">
        <Waypoint onEnter={() => this.props.handleWaypoints(1)} />
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <Steemblr src={logo} alt="logo" />

        {this.loadForm()}
      </Container>
    );
  }
}
