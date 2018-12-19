import React, { Component } from "react";
import styled from "styled-components";
import defaultApp from "../../environment";
import "firebase/auth";
import RegisterBtn from "../../Components/RegisterBtn";
import Success from "./Success";
import Spinner from "../../Components/Spinner";
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
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSignedUp: true,
      isSending: false,
      isError: false,
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        this.setState({
          isSending: false,
          isError: true,
          errorMsg: error.message
        });
      });
    if (this.state.isError === false) {
      await defaultApp.auth().onAuthStateChanged(user => {
        if (user.emailVerified === false) {
          user.sendEmailVerification();
        }
      });
      this.setState({
        isSending: false,
        isSignedUp: true
      });
    }
  };
  render() {
    const {
      email,
      password,
      isSignedUp,
      isSending,
      isError,
      errorMsg
    } = this.state;
    return (
      <Container>
        {isError && <p>{errorMsg}</p>}
        {isSending && <Spinner />}
        {isSignedUp ? (
          <Success />
        ) : (
          <Form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="new-email"
              onChange={e => this.handleChange(e)}
              value={email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={e => this.handleChange(e)}
              value={password}
              required
            />
            {isSending ? (
              <RegisterBtn type="submit" disabled>
                Submit
              </RegisterBtn>
            ) : (
              <RegisterBtn type="submit">Submit</RegisterBtn>
            )}
          </Form>
        )}
      </Container>
    );
  }
}
