import React, { Component } from "react";
import styled from "styled-components";
import store from "../../store";
import { debounce } from "lodash";
import CloseModal from "../CloseModal";
import VideoContainer from "./VideoContainer";
import newPostVideo from "../../actions/newPostVideo";
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
  padding: ${props => (props.isVideoSet ? 0 : "30px")};
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
      isVideoSet: false,
      tags: [],
      type: "video",
      innerWidth: window.innerWidth
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.cancelVideo = this.cancelVideo.bind(this);
    this.inputDebounce = debounce(async function(e) {
      await this.setVideo();
    }, 1000);
    this.modalStyle = {
      postion: "fixed",
      height: "100%",

      overlay: {
        backgroundColor: "rgba(28, 49, 58, 0.90)"
      },
      content: {
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        width:
          this.state.innerWidth > 768
            ? "40vw"
            : this.state.innerWidth <= 768 && this.state.innerWidth > 425
              ? "60vw"
              : "85vw",
        bottom: "none",
        maxHeight: "65vh",
        border: "0",
        display: "flex",
        flexDirection: "column",
        transform: "translate(-50%, -50%)"
      }
    };
  }

  async handleTextArea(e) {
    await this.setState({
      textarea: e.target.value
    });
    e.persist();
    this.inputDebounce(e);
  }
  async setVideo() {
    if (this.state.textarea.includes("https://")) {
      if (this.state.isVideoSet === true) {
        await this.setState({
          isVideoSet: false
        });
        this.setState({
          isVideoSet: true
        });
        this.props.showForm();
        store.dispatch(newPostVideo(this.state.textarea));
      } else {
        await this.setState({
          isVideoSet: true
        });
        this.props.showForm();
        store.dispatch(newPostVideo(this.state.textarea));
      }
    } else {
      return void 0;
    }
  }
  cancelVideo() {
    this.setState({
      isVideoSet: false,
      textarea: ""
    });
  }
  render() {
    return (
      <Container isVideoSet={this.state.isVideoSet}>
        {this.state.isVideoSet ? (
          <InnerContainer>
            <VideoContainer text={this.state.textarea} />
            <Button onClick={this.cancelVideo}>X</Button>
          </InnerContainer>
        ) : (
          <TextArea
            name="textarea"
            placeholder="Enter video url"
            onChange={this.handleTextArea}
          />
        )}
        {this.state.isVideoSet === false &&
          store.getState().newPost.isForm === false && <CloseModal />}
      </Container>
    );
  }
}
