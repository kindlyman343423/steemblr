import React, { Component } from "react";

import uploadFiles from "../Functions/uploadFiles.js";
import store from "../store";
import { changePostType } from "../actions/stateActions";
import Header from "../Header/Header";
import TubeEmbed from "react-tube-embed";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUpload(e) {
    store.dispatch(changePostType("photos"));
    uploadFiles(e.target.files[0]);
  }

  handleChange(value) {}
  render() {
    return (
      <div className="container">
        <Header login={this.props.login} />
        <input type="file" name="myFile" onChange={this.handleUpload} /> <br />
        <TubeEmbed src="https://www.youtube.com/watch?v=Jq5A5ctua8s" />
      </div>
    );
  }
}

export default Home;
