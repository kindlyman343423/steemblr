import React, { Component } from "react";

import AddNew from "./AddNew";
import { NavLink } from "react-router-dom";

import "./Dashboard.css";

import ProfileMenu from "./ProfileMenu";
import { MdHome, MdExplore, MdBorderColor } from "react-icons/lib/md/";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import muiTheme from "../Components/muiTheme";
export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: ""
    };
  }

  render() {
    const dashboard = {
      padding: "5px",
      marginRight: "3em",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    };

    return (
      <div style={dashboard} className="dashboardIcons">
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
      </div>
    );
  }

  newMethod() {
    return "5px";
  }
}
