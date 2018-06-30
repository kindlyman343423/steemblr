import React, { Component } from "react";
import checkProfile from "../Functions/checkProfile";
import BlogView from "./BlogView";
import NotFound from "../Components/NotFound";
class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCheck();
  }
  async handleCheck() {
    this.setState({
      profileExists: await checkProfile(this.props.match.params.username)
    });
  }
  render() {
    //profile needs to be in db to render blog
    if (this.state.profileExists) {
      return <BlogView {...this.props} key={this.props.location.key} />;
    } else {
      return <NotFound />;
    }
  }
}

export default Blog;
