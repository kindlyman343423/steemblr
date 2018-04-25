import React, { Component } from "react";

import Dashboard from "./Dashboard";
import LoginModal from "./LoginModal";
import { Input } from "rebass";

import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: this.props.login,
      tags: ["music", "story"]
    };
  }

  render() {
    return (
      <div className="Header">
        <h2 className="logo">steemblr</h2>

        <Input bg="white" color="black" placeholder="Search" />

        {this.state.login === true ? (
          <Dashboard />
        ) : (
          <LoginModal updateAppComponent={this.updateAppComponent} />
        )}
      </div>
    );
  }
  s;
}
