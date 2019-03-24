import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import store from "../../store";
import newPostTags, { newPostIsNSFW } from "../../actions/newPostTags";
import styled from "styled-components";
import "./reactTagsInput.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const Container = styled.div`
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export default class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      isNSFW: false
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
    const { tags } = this.state;
    await this.setState({ tags: props });
    store.dispatch(newPostTags(this.state.tags));
  };
  handleChange = name => event => {
    const { isNSFW } = this.state;
    this.setState({ [name]: event.target.checked });
    store.dispatch(newPostIsNSFW(!isNSFW));
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
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.isNSFW}
              value="isNSFW"
              onChange={this.handleChange("isNSFW")}
            />
          }
          label="+18"
        />
      </Container>
    );
  }
}
