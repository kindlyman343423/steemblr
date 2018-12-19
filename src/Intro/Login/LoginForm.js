import React, { Component } from "react";
import styled from "styled-components";
import LoginBtn from "../../Components/LoginBtn";
import defaultApp from "../../environment";
import "firebase/auth";
import Spinner from "../../Components/Spinner";
import { Redirect } from "react-router-dom";
const Container = styled.div`
  animation: pulse 1s 1;
  p {
    color #fff;
  }
  @keyframes pulse {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 10px;
  input {
    padding: 5px;
    margin-bottom: 10px;
    width: 250px;
    outline: none;
  }
  button {
    width: 250px;
  }
`;
export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isSignedIn: false,
      isError: false,
      isSending: false,
      errorMsg: ""
    };
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      isSending: true,
      isError: false
    });
    await defaultApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        this.setState({
          isSending: false,
          isError: true,
          errorMsg: error.message
        });
      });
    if (this.state.isError === false) {
      this.setState({
        isSending: false,
        isSignedIn: true
      });
    }
  };
  render() {
    const {
      email,
      password,
      isError,
      errorMsg,
      isSending,
      isSignedIn
    } = this.state;
    return (
      <Container>
        {isError && <p>{errorMsg}</p>}
        {isSending && <Spinner />}
        {isSignedIn && <Redirect to="/home" />}
        <Form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            autoComplete="current-email"
            onChange={e => this.handleChange(e)}
            value={email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={e => this.handleChange(e)}
            value={password}
            required
          />
          <LoginBtn type="submit">Login</LoginBtn>
        </Form>
      </Container>
    );
  }
}
