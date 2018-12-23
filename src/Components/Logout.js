import React, { Component } from "react";
import { Redirect } from "react-router-dom";
export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    localStorage.removeItem("steemToken");
    localStorage.removeItem("googleToken");
    this.props.handleLogout();
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}
