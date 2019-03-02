import React, { Component } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Icon from "react-icons-kit";
import { ic_search } from "react-icons-kit/md/ic_search";
import { toast } from "react-toastify";
const Container = styled.div`
  grid-area: input;
  transition: 2.5s ease-in;
`;
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
const InputMobile = styled.input`
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
const Form = styled.form`
  display: flex;
  justify-content: flex-start;
`;
const SearchContainer = styled.div`
  div {
    float: right;
    padding-right: 10px;
  }
`;
class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isSubmitted: false,
      search: ""
    };
  }
  handleInput = e => {
    this.setState({
      isSubmitted: false,
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const search = this.state.search.replace(/[^a-zA-Z0-9]/g, "");
    if (search.length === 0) {
      toast.warning(
        "You can't perform empty search or with special characters."
      );
      this.setState({
        search: search
      });
    } else {
      this.setState({
        search: search,
        isSubmitted: true
      });
    }
  };
  handleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    if (window.innerWidth <= 425) {
      return (
        <Container>
          {this.state.isSubmitted && (
            <Redirect to={`/search/${this.state.search}/new`} />
          )}
          <form onSubmit={this.handleSubmit}>
            {this.state.isOpen ? (
              <SearchContainer>
                <InputMobile
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
    } else {
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
}
export default SearchInput;
