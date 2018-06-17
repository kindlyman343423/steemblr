import React, { Component } from "react";
import BlogView from "./BlogView";
class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <BlogView {...this.props} key={this.props.location.key} />;
  }
}

export default Blog;
