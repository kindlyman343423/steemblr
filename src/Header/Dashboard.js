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
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    padding-right: 10px;
    width: 32px;
    height: 32px;
  }
  @media (max-width: 768px) {
    svg {
      width: 28px;
      width: 28px;
    }
  }
  @media (max-width: 425px) {
    justify-content: flex-end;
    svg {
      padding-right: 6px;
      width: 18px;
      width: 18px;
    }
  }
  @media (max-width: 375px) {
    svg {
      padding-right: 5px;
    }
    margin-left: 0px;
    margin-right: 0px;
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
          <MdHome />
        </NavLink>
        <NavLink
          activeClassName="selected"
          className="dashboardIcon"
          to="/explore/trending"
        >
          <MdExplore />
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
