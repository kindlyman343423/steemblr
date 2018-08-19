import React, { Component } from "react";
import styled from "styled-components";
import store from "../../store";
import { debounce } from "lodash";
import CloseModal from "../CloseModal";
import MediaContainer from "../MediaContainer";
import { newPostAudio, newPostAudioDel } from "../../actions/newPostAudio";
const TextArea = styled.textarea`
  box-sizing: border-box;
  border: 0;
  outline: none;
  width: 100%;
`;
const Container = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  padding: ${props => (props.isAudioSet ? 0 : "30px")};
`;
const InnerContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  iframe {
    width: 100%;
  }
`;
const Button = styled.button`
  position: absolute;
  border: 0;
  font-size: 16px;
  background: white;
  padding: 10px;
  top: 0;
  right: 0;
  color: black;
  &:hover {
    color: red;
  }
`;
export default class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textarea: "",
      isAudioSet: false,
      tags: [],
      type: "audio",
      innerWidth: window.innerWidth
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.cancelAudio = this.cancelAudio.bind(this);
    this.inputDebounce = debounce(async function(e) {
      await this.setAudio();
    }, 1000);
  }

  async handleTextArea(e) {
    await this.setState({
      textarea: e.target.value
    });
    e.persist();
    this.inputDebounce(e);
  }
  async setAudio() {
    if (this.state.textarea.includes("https://")) {
      if (this.state.isAudioSet === true) {
        await this.setState({
          isAudioSet: false
        });
        this.setState({
          isAudioSet: true
        });
        this.props.showForm();
        store.dispatch(newPostAudio(this.state.textarea));
      } else {
        await this.setState({
          isAudioSet: true
        });
        this.props.showForm();
        store.dispatch(newPostAudio(this.state.textarea));
      }
    } else {
      return void 0;
    }
  }
  cancelAudio() {
    this.setState({
      isAudioSet: false,
      textarea: ""
    });
    store.dispatch(newPostAudioDel());
  }
  render() {
    return (
      <Container isAudioSet={this.state.isAudioSet}>
        {this.state.isAudioSet ? (
          <InnerContainer>
            <MediaContainer text={this.state.textarea} />
            <Button onClick={this.cancelAudio}>X</Button>
          </InnerContainer>
        ) : (
          <TextArea
            name="textarea"
            placeholder="Paste a URL to soundcloud"
            onChange={this.handleTextArea}
          />
        )}
        {this.state.isAudioSet === false &&
          store.getState().newPostInterface.isForm === false && <CloseModal />}
      </Container>
    );
  }
}
