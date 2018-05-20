import React, { Component } from "react";
import styled from "styled-components";
const Container = styled.div`
  box-sizing: border-box;
  align-self: flex-start;
  position: absolute;
  top: 0;
  padding: 25px;
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
`;
export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <input type="search" placeholder="Search..." />
      </Container>
    );
  }
}
