import React, { Component } from "react";

import store from "../../store";
import newPostBody from "../../actions/newPostBody";
import mediumDraftExporter from "medium-draft/lib/exporter";
import styled from "styled-components";
import { Editor, createEditorState } from "medium-draft";

const Container = styled.div`
  box-sizing: border-box;
`;
export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { editorState: createEditorState() };
  }
  onChange = editorState => {
    this.setState({ editorState });
    const content = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    store.dispatch(newPostBody(content));
  };
  render() {
    return (
      <Container>
        <Editor
          ref="editor"
          placeholder="Your story..."
          editorState={this.state.editorState}
          onChange={this.onChange}
          sideButtons={[]}
        />
      </Container>
    );
  }
}
