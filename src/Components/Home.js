import React, { Component } from "react";

import uploadFiles from "../Functions/uploadFiles.js";
import store from "../store";
import { changePostType } from "../actions/stateActions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(e) {
    store.dispatch(changePostType("photos"));
    uploadFiles(e.target.files[0]);
  }
  render() {
    return (
      <div>
        <input type="file" name="myFile" onChange={this.handleUpload} />
      </div>
    );
  }
}

export default Home;
