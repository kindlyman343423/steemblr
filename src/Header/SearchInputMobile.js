import React, { Component } from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { ic_search } from "react-icons-kit/md/ic_search";
import { Redirect } from "react-router-dom";
const Container = styled.div`
  grid-area: input;
  transition: 2.5s ease-in;
`;
const Input = styled.input`
  border: 0;
  outline: 0;
  top: 12px;
  left: 5px;
  background: rgba(255, 255, 255, 1);
  height: 30px;
  width: 70vw;
  font-size: 16px;
  border-radius: 2px;
  padding-left: 5px;
  position: fixed;
  z-index: 1000;

  &:focus {
    background: rgba(255, 255, 255, 1);
    transition: 0.2s;
  }
`;
const SearchContainer = styled.div`
  div {
    float: right;
    padding-right: 10px;
  }
`;

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      isOpen: false,
      search: ""
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
      <Container>
        {this.state.isSubmitted ? (
          <Redirect to={`/search/tag/?${this.state.search}`} />
        ) : (
          void 0
        )}
        <form onSubmit={this.handleSubmit}>
          {this.state.isOpen ? (
            <SearchContainer>
              <Input
                name="search"
                placeholder="Search"
                onChange={this.handleInput}
                value={this.state.search}
              />
              <Icon icon={ic_search} size={24} onClick={this.handleOpen} />
            </SearchContainer>
          ) : (
            <SearchContainer>
              <Icon icon={ic_search} size={24} onClick={this.handleOpen} />
            </SearchContainer>
          )}
        </form>
      </Container>
    );
  }
}
