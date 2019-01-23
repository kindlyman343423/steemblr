import React, { Component } from "react";
import { ic_check } from "react-icons-kit/md/ic_check";
import { ic_close } from "react-icons-kit/md/ic_close";
import Icon from "react-icons-kit";
export default class UsernameChecker extends Component {
  render() {
    return (
      <span>
        {this.props.isUsernameTaken ? (
          <Icon icon={ic_close} size={24} style={{ color: "#e53935" }} />
        ) : (
          <Icon icon={ic_check} size={24} style={{ color: "#388e3c" }} />
        )}
      </span>
    );
  }
}
