import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { hot } from "react-hot-loader";
const RegisterBtn = styled.button`
  padding: 10px;
  border: 0;
  background-color: "#FFF";
  outline: none;

  font-weight: 700;
  transition: 0.5s;
  &:hover {
    background-color: #808e95;
    transition: 0.5s;
  }
`;
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <RegisterBtn
          onClick={() =>
            (window.location.href = "https://signup.steemit.com/?ref=steemblr")
          }
        >
          Register
        </RegisterBtn>
      </div>
    );
  }
}
export default hot(module)(Register);
