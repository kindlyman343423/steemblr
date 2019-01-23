import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import store from "../../store";
import newPostTags from "../../actions/newPostTags";
import styled from "styled-components";
import "./reactTagsInput.css";
const Container = styled.div`
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
`;
export default class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };
  }
  componentDidMount() {
    if (store.getState().newPostInterface.editingExistingPost === true) {
      this.setState({
        tags: store.getState().newPost.tags
      });
    }
  }
  handleTagsChange = async props => {
    await this.setState({ tags: props });
    store.dispatch(newPostTags(this.state.tags));
  };
  render() {
    return (
      <Container>
        <TagsInput
          name="tags"
          value={this.state.tags}
          onChange={this.handleTagsChange}
          addKeys={[188, 32, 9, 13]}
          maxTags={5}
        />
      </Container>
    );
  }
}
