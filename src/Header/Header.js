import React, { Component } from "react";

import Dashboard from "./Dashboard";
import LoginModal from "./LoginModal";
import { Input } from "rebass";
import { hot } from "react-hot-loader";
import "./Header.css";

import styled from "styled-components";
import colors from "../styles/colors";
import createHistory from "history/createBrowserHistory";
const history = createHistory();

history.listen(location => {
  console.log(location.pathname); // /home
});
const Container = styled.div`
  color: grey;
  display: grid;
  grid-template-columns: 20% 50% 30%;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100vw;
  z-index: 1000;
  background-color: ${colors.background};
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: this.props.login
    };
  }

  render() {
    return (
      <Container>
        <h2 className="logo">steemblr</h2>

        <Input bg="white" color="black" placeholder="Search" />

        {this.state.login === true ? (
          <Dashboard />
        ) : (
          <LoginModal updateAppComponent={this.updateAppComponent} />
        )}
      </Container>
    );
  }
}
export default hot(module)(Header);
