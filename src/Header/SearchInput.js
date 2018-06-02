import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { Redirect } from "react-router-dom";
const Input = styled.input`
  height: 30px;
  padding-left: 5px;
  outline: none;
  width: 85%;
  border: 1px solid ${colors.borders.light};
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
      <form onSubmit={this.handleSubmit}>
        {this.state.isSubmitted ? (
          <Redirect to={`/search/tag/?${this.state.search}`} />
        ) : (
          void 0
        )}
        <Input
          name="search"
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleInput}
        />
      </form>
    );
  }
}
export default SearchInput;
