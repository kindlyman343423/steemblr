import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { Link } from "react-router-dom";

import AppearanceOptions from "./AppearanceOptions";

const Container = styled.div`
  background-color: #37474f;
  display: block;
  overflow-y: scroll;
  max-height: 100vh;
`;
const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: #102027;
  h2 {
    font-weight: 500;
    padding: 5px;
    font-size: 18px;
    margin: 0;
    color: #fff;
  }
`;
const ExitBtn = styled.button`
  outline: none;
  padding: 10px;
  border: 0;
  background-color: #808e95;
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:focus {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;
const SaveBtn = styled.button`
  outline: none;
  padding: 10px;
  border: 0;
  background-color: ${colors.buttons.login};
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:focus {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;

export default class Menu extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Link to="/settings/customize">
            <ExitBtn>Exit</ExitBtn>
          </Link>
          <h2>Edit Theme</h2>
          <SaveBtn>Save</SaveBtn>
        </Header>
        <AppearanceOptions />
      </Container>
    );
  }
}
