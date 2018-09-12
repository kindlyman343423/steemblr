import React, { Component } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
const Input = styled.input`
  height: 30px;
  padding-left: 5px;
  outline: none;
  width: 65%;
  border: 0;
  background: rgba(96, 125, 139, 0.2);
  height: 30px;
  width: 30vw;
  font-size: 16px;
  border-radius: 2px;
  padding-left: 5px;
  transition: 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 1);
    transition: 0.2s;
  }
`;
const Form = styled.form`
  display: flex;
  justify-content: flex-start;
`;
class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      search: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e) {
    this.setState({
      isSubmitted: false,
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitted: true
    });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.isSubmitted ? (
          <Redirect to={`/search/${this.state.search}/new`} />
        ) : (
          void 0
        )}
        <Input
          name="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleInput}
        />
      </Form>
    );
  }
}
export default SearchInput;
