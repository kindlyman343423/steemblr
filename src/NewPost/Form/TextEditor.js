import React, { Component } from "react";
import { convertToRaw } from "draft-js";
import store from "../../store";
import newPostBody from "../../actions/newPostBody";
import mediumDraftImporter from "medium-draft/lib/importer";
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
  componentDidMount() {
    if (store.getState().newPostInterface.editingExistingPost === true) {
      this.setState({
        editorState: createEditorState(
          convertToRaw(mediumDraftImporter(store.getState().newPost.body))
        )
      });
    }
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
          required
        />
      </Container>
    );
  }
}
