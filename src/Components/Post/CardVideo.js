import React, { Component } from "react";
import YouTube from "react-youtube";

export default class CardVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: JSON.parse(this.props.json_metadata).links[0]
    };
  }
  handleLink() {
    return this.state.link.replace("https://www.youtube.com/watch?v=", "");
  }
  render() {
    return <YouTube videoId={this.handleLink()} />;
  }
}
