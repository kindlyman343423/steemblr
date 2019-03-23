import React, { Component } from "react";
import styled from "styled-components";
import store from "../../store";
import editUserSettings from "actions/editUserSettings";
import saveUserSettings from "Functions/Firebase/saveUserSettings";
import { toast } from "react-toastify";
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  cursor: pointer;
  color: #fff;
  height: 40px;
  outline: none;
  background: #000;
  border: 1px solid #fff;
  :hover {
    transition: 0.2s;
    background-color: rgba(255, 255, 255, 0.1);
  }
  :active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
export default class NSFWOverlay extends Component {
  handleBtn = async () => {
    const { login } = this.props;
    //Enabling NSFW content
    const props = {
      property: "isNSFWAllowed",
      value: true
    };
    store.dispatch(editUserSettings(props));
    if (login) {
      await saveUserSettings();
      toast.info("Saved new settings.");
    }
  };
  render() {
    return (
      <Overlay>
        <Btn onClick={this.handleBtn}>enable NSFW content</Btn>
      </Overlay>
    );
  }
}
