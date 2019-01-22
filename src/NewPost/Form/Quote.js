import React, { Component } from "react";
import styled from "styled-components";
import store from "../../store";
import { newPostQuote } from "../../actions/newPostQuote";
const Input = styled.textarea`
  box-sizing: border-box;
  padding-left: 30px;
  font-size: 24px;
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

    this.state = { quote: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const input = `<blockquote>${e.target.value}</blockquote>`;
    this.setState({
      [e.target.name]: e.target.value
    });
    store.dispatch(newPostQuote(input));
  }
  render() {
    return (
      <Input
        required
        name="quote"
        placeholder="Quote"
        type="text"
        value={this.state.quote}
        onChange={this.handleInputChange}
      />
    );
  }
}
