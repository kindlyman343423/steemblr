import React, { Component } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import Menu from "./Menu";

const Container = styled.div`
  display: grid;
`;
export default class Settings extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Menu />
      </Container>
    );
  }
}
