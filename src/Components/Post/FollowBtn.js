import React, { Component } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
export default class FollowBtn extends Component {
  render() {
    if (this.props.componentLocation === "explore") {
      const Button = styled.button`
        cursor: pointer;
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        position: absolute;
        top: 25%;
        right: -1px;
        background: transparent;
        border: 0;
        outline: 0;
        font-weight: 300;
        margin-right: 10px;
        &:active {
          color: ${colors.font.active};
        }
      `;
      return <Button>{this.props.text}</Button>;
    } else {
      const Button = styled.button`
        cursor: pointer;
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        position: absolute;
        top: 25%;
        right: 0;
        background: transparent;
        border: 0;
        outline: 0;
        font-weight: 300;
        margin-right: 10px;
        &:active {
          background-color: rgba(200, 200, 200, 0.5);
        }
        @media (max-width: 425px) {
        }
      `;
      return <Button>{this.props.text}</Button>;
    }
  }
}
