import React, { Component } from "react";
import styled from "styled-components";
import store from "../../store";
import newPostTitle from "../../actions/newPostTitle";
const Input = styled.input`
  box-sizing: border-box;
  padding-left: 30px;
  font-size: 32px;
  height: 36px;
  outline: none;
  border: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 200;
  width: 100%;
`;
export default class Title extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    if (store.getState().newPostInterface.editingExistingPost === true) {
      this.setState({
        title: store.getState().newPost.title
      });
    }
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    store.dispatch(newPostTitle(e.target.value));
  }
  render() {
    return (
      <Input
        required
        name="title"
        placeholder="Title"
        type="text"
        value={this.state.title}
        onChange={this.handleInputChange}
      />
    );
  }
}
