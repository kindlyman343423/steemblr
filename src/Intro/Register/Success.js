import React, { Component } from "react";
import styled from "styled-components";
import LoginBtn from "../../Components/LoginBtn";
import LoginForm from "../Login/LoginForm";
const Container = styled.div`
  color: #fff;
  button {
    width: 250px;
  }
`;

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldLoadForm: false
    };
  }
  handleBtn = () => {
    this.setState({
      shouldLoadForm: true
    });
  };
  render() {
    const { shouldLoadForm } = this.state;
    return (
      <Container>
        {shouldLoadForm ? (
          <LoginForm />
        ) : (
          <div>
            <p>Success! Verification link has been sent to your email.</p>
            <LoginBtn onClick={this.handleBtn}>Login</LoginBtn>
          </div>
        )}
      </Container>
    );
  }
}
