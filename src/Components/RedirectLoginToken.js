import React, { Component } from "react";

export default class RedirectLoginToken extends Component {
  constructor(props) {
    super(props);

    const url = window.location.href;

    if (url.includes("code")) {
      const accessToken = url
        .split("code=")
        .pop()
        .split("&")
        .shift();
      localStorage.setItem("steemToken", accessToken);
      window.location = "home";
    }
  }

  render() {
    console.log("redirect login token", this.props);
    return <span />;
  }
}
