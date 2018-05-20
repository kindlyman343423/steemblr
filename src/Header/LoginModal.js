import React, { Component } from "react";
import api from "../Api";
import styled from "styled-components";
import colors from "../styles/colors";
import { hot } from "react-hot-loader";
const LoginBtn = styled.button`
  padding: 10px;
  border: 0;
  background-color: ${colors.buttons.login};
  outline: none;
  color: #fff;
  font-weight: 700;
  transition: 0.1s;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.buttons.loginHover};
    transition: 0.1s;
  }
`;
class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const link = api.getLoginURL();
    return (
      <div>
        <LoginBtn onClick={() => (window.location.href = link)}>
          {this.props.text}
        </LoginBtn>
      </div>
    );
  }
}
export default hot(module)(LoginModal);
