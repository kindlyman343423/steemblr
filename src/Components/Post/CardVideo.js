import React, { Component } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
export default class Video extends Component {
  getLink(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex)[0];
  }
  handleLink() {
    const url = this.getLink(this.props.media);
    const links = [
      "https://www.youtube.com/watch?v=",
      "https://youtu.be/",
      "https://soundcloud.com/",
      "https://www.mixcloud.com/"
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

Video.propTypes = {
  media: PropTypes.string
};
