import React, { Component } from "react";
import PostLoader from "./PostLoader";
export default class Test extends Component {
  render() {
    return (
      <div style={{ color: "white", marginTop: "10em" }}>
        {this.props.location.search.substring(1)}
        <PostLoader location={this.props.location} />
      </div>
    );
  }
}
