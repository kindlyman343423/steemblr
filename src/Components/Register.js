import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { hot } from "react-hot-loader";
const RegisterBtn = styled.button`
  padding: 10px;
  border: 0;
  background-color: "#FFF";
  outline: none;
  cursor: pointer;
  font-weight: 700;
  transition: 0.1s;
  &:hover {
    background-color: #fff;
    transition: 0.1s;
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
