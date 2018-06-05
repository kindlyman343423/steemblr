import React, { Component } from "react";
import Spinner from "./Spinner";

export default class RedirectLoginToken extends Component {
  constructor(props) {
    super(props);

    const url = window.location.href;

    if (url.includes("access_token")) {
      const accessToken = url
        .split("access_token=")
        .pop()
        .split("&")
        .shift();
      localStorage.setItem("token", accessToken);
      window.location = "home";
    }
  }

  render() {
    return <Spinner />;
  }
}
