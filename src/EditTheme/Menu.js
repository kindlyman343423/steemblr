import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppearanceOptions from "./AppearanceOptions";
import saveTheme from "../Functions/saveTheme";
const Container = styled.div`
  background-color: #9e9e9e;
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

class Menu extends Component {
  save = () => {
    const account = this.props.steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.login.username;
    })[0];
    const props = {
      user: this.props.login.username,
      layout: account
    };
    saveTheme(props);
  };
  render() {
    return (
      <Container>
        <Header>
          <Link to="/settings/customize">
            <ExitBtn>Exit</ExitBtn>
          </Link>
          <h2>Edit Theme</h2>
          <SaveBtn onClick={this.save}>Save</SaveBtn>
        </Header>
        <AppearanceOptions />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  steemAccounts: state.steemAccounts
});
export default connect(
  mapStateToProps,
  {}
)(Menu);
