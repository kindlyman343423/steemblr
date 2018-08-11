import React, { Component } from "react";
import store from "../store";
import { newPostModal } from "../actions/newPostInterface";
import CloseBtn from "../Components/CloseBtn";
export default class CloseModal extends Component {
  handleClick = () => {
    store.dispatch(newPostModal(false));
  };
  render() {
    return <CloseBtn onClick={this.handleClick}>Close</CloseBtn>;
  }
}
