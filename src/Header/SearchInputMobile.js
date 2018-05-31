import React, { Component } from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { ic_search } from "react-icons-kit/md/ic_search";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
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
    return (
      <Container>
        {this.state.isOpen ? (
          <SearchContainer>
            <Input name="search" placeholder="Search" />
            <Icon icon={ic_search} size={24} onClick={this.handleOpen} />
          </SearchContainer>
        ) : (
          <SearchContainer>
            <Icon icon={ic_search} size={24} onClick={this.handleOpen} />
          </SearchContainer>
        )}
      </Container>
    );
  }
}
