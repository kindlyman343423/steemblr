import React, { Component } from "react";
import styled from "styled-components";
import store from "../../store";
import { newPostQuoteSource } from "../../actions/newPostQuote";
const Input = styled.input`
  box-sizing: border-box;
  padding-left: 30px;
  font-size: 16px;
  height: 36px;
  outline: none;
  border: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 200;
  width: 100%;
`;
export default class Quote extends Component {
  constructor(props) {
    super(props);

    this.state = { source: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    const isEditing = store.getState().newPostInterface.editingExistingPost;
    if (isEditing) {
      this.setState({
        source: store.getState().newPost.quoteSource
      });
    }
  }
  handleInputChange(e) {
    const input = e.target.value;
    this.setState({
      [e.target.name]: e.target.value
    });
    store.dispatch(newPostQuoteSource(input));
  }
  render() {
    return (
      <Input
        required
        name="source"
        placeholder="source"
        type="text"
        value={this.state.source}
        onChange={this.handleInputChange}
      />
    );
  }
}
