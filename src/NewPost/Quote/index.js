import React, { Component } from "react";

import Form from "../Form/";

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innerWidth: window.innerWidth
    };
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return <Form />;
  }
}
