import React, { Component } from "react";
import styled from "styled-components";
import { arrows_horizontal } from "react-icons-kit/ikons/arrows_horizontal";
import { Icon } from "react-icons-kit";
const Button = styled.button`
  display: none;
  position: fixed;
  width: 100px;
  bottom: 10px;
  background: #b4b4b4;
  border: 0;
  outline: none;
  color: black;
  left: calc(50vw - 50px);
  border-radius: 10px;
  @media (max-width: 425px) {
    display: inherit;
  }
`;
export default class SwitchBtn extends Component {
  render() {
    return (
      <Button onClick={this.props.handleViewSwitch}>
        <Icon size={24} icon={arrows_horizontal} />
      </Button>
    );
  }
}
