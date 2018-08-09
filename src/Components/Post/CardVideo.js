import React, { Component } from "react";
import YouTube from "react-youtube";

export default class CardVideo extends Component {
  getLink(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex)[0];
  }
  handleLink() {
    const url = this.getLink(this.props.text);
    if (url.includes("https://www.youtube.com/watch?v=")) {
      return url.replace("https://www.youtube.com/watch?v=", "");
    } else if (url.includes("https://youtu.be/")) {
      return url.replace("https://youtu.be/", "");
    }
  }
  render() {
    return <YouTube videoId={this.handleLink()} />;
  }
}
