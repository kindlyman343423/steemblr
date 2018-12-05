import React, { Component } from "react";
import styled from "styled-components";
import SearchInput from "../Header/SearchInput";

const Container = styled.div`
  box-sizing: border-box;
  align-self: flex-start;
  position: fixed;
  top: 0;
  padding: 25px;
  z-index: 20;
  input {
    border: 0;
    outline: 0;
    background: rgba(255, 255, 255, 0.6);
    height: 30px;
    width: 30vw;
    font-size: 16px;
    border-radius: 2px;
    padding-left: 5px;
    transition: 0.2s;
  }
  input:focus {
    background: rgba(255, 255, 255, 1);
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    input {
      width: 60vw;
    }
  }
  @media (max-width: 425px) {
    input {
      width: 80vw;
    }
  }
  @media (max-width: 375px) {
    input {
      width: 80vw;
    }
  }
`;
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <SearchInput />
      </Container>
    );
  }
}
