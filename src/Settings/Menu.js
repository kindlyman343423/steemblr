import React, { Component } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 60%;
  div {
    padding: 10px;
    text-align: left;
  }
  .activeOption {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
export default class Menu extends Component {
  render() {
    return (
      <Container>
        <NavLink activeClassName="activeOption" to="/settings/account">
          <div>
            <b>Account</b>
            <p>Essential settings</p>
          </div>
        </NavLink>
      </Container>
    );
  }
}
