import React from "react";
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor
} from "medium-draft";
import "isomorphic-fetch";
import uploadFiles from "../Functions/uploadFiles";

export default class CustomImageSideButton extends ImageSideButton {
  /*
  We will only check for first file and also whether
  it is an image or not.
  */
  onChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf("image/") === 0) {
      // This is a post request to server endpoint with image as `image`
      const formData = new FormData();
      formData.append("image", file);
      uploadFiles(file).then(response => {
        this.props.setEditorState(
          addNewBlock(this.props.getEditorState(), Block.IMAGE, {
            src: response
          })
        );
      });
    }
    this.props.close();
  }
}
