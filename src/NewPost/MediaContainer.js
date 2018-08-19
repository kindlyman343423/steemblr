import React, { Component } from "react";
import ReactPlayer from "react-player";

export default class MediaContainer extends Component {
  getLink(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex)[0];
  }
  handleLink() {
    const url = this.getLink(this.props.text);
    const links = [
      "https://www.youtube.com/watch?v=",
      "https://youtu.be/",
      "https://soundcloud.com/"
    ];
    const filter = links.filter(e => {
      return url.includes(e);
    });
    if (filter.length === 1) {
      return url;
    }
  }
  render() {
    return <ReactPlayer width="100%" url={this.handleLink()} />;
  }
}
