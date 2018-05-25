import React, { Component } from "react";

import AddNew from "./AddNew";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./Dashboard.css";

import ProfileMenu from "./ProfileMenu";
import { MdHome, MdExplore } from "react-icons/lib/md/";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "../Components/muiTheme";

const Container = styled.div`
  padding: 5px;
  margin-right: 3em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    padding-right: 10px;
  }
`;

export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: ""
    };
  }

  render() {
    return (
      <Container className="dashboardIcons">
        <NavLink
          activeClassName="selected"
          className="dashboardIcon"
          to="/home"
        >
          <MdHome size={32} />
        </NavLink>
        <NavLink
          activeClassName="selected"
          className="dashboardIcon"
          to="/explore/trending"
        >
          <MdExplore size={32} />
        </NavLink>
        <MuiThemeProvider>
          <AddNew />
        </MuiThemeProvider>

        <MuiThemeProvider muiTheme={muiTheme}>
          <ProfileMenu />
        </MuiThemeProvider>
      </Container>
    );
  }

  newMethod() {
    return "5px";
  }
}
