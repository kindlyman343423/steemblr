import React, { Component } from "react";
export default class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: []
    };
  }

  render() {
    return (
      <div>
        <h2>Intro</h2>

        <p>{this.props.text}</p>
      </div>
    );
  }
}
