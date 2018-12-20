import React, { Component } from "react";
import styled from "styled-components";
import LoginModal from "../../Header/LoginModal";
import BackBtn from "../../Components/BackBtn";
import LoginForm from "./LoginForm";
const MainContainer = styled.div`
  color: #fff;
  button {
    width: 250px;
  }
`;
export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false
    };
  }
  handleButtons = () => {
    this.setState({
      showButtons: true
    });
  };
  render() {
    return (
      <MainContainer>
        <LoginModal text="Login with steemconnect" />
        <p>or</p>
        <LoginForm />
        <BackBtn onClick={() => this.props.handleForm("")}>Back</BackBtn>
      </MainContainer>
    );
  }
}
