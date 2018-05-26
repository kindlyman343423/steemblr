import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { MdPersonAdd } from "react-icons/lib/md";
export default class FollowBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.componentLocation === "explore") {
      const Button = styled.button`
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        position: absolute;
        top: 25%;
        right: -1px;
        background: transparent;
        border: 0;
        outline: 0;
        font-weight: 400;
        margin-right: 10px;
        &:active {
          color: ${colors.font.active};
        }
        @media (max-width: 425px) {
          border-bottom-left-radius: 5px;
          font-weight: 200;
          font-size: 10px;
          color: ${colors.font.lightNormal};
          top: -1px;
          margin-right: 0;
          background-color: ${colors.buttons.active};
        }
      `;
      return <Button>{this.props.text}</Button>;
    } else {
      const Button = styled.button`
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        position: absolute;
        top: 25%;
        right: 0;
        background: transparent;
        border: 0;
        outline: 0;
        font-weight: 400;
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
