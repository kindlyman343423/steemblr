import React, { Component } from "react";
import styled from "styled-components";

import colors from "../../styles/colors";
import uploadFiles from "../../Functions/uploadFiles";
import SpinnerOverlay from "../SpinnerOverlay";
import Icon from "react-icons-kit";
import { ic_insert_photo } from "react-icons-kit/md/ic_insert_photo";
import { ic_public } from "react-icons-kit/md/ic_public";
import store from "../../store";
import newPostType from "../../actions/newPostType";
import { newPostPhoto, newPostPhotoDel } from "../../actions/newPostPhoto";
import { debounce } from "lodash";
import CloseModal from "../CloseModal";
import {
  newPostIsError,
  newPostErrorMsg
} from "../../actions/newPostInterface";
const FileInputLabel = styled.label`
  display: flex;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 2px dashed black;
  border-left: 0;
  flex-direction: column;
  padding: 50px;
  cursor: pointer;
  width: 100%;
  transition: 500ms ease;
  margin-bottom: 10px;
  &:hover {
    transition: 500ms ease;
    border-color: ${colors.events.hover};
    color: ${colors.events.hover};
  }
`;
const UrlInputLabel = styled.label`
  display: flex;
  text-align: center;
  box-sizing: border-box;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 2px dashed black;
  border-left: 0;
  border-right: 0;
  flex-direction: column;
  padding: 50px;
  cursor: pointer;
  width: 100%;
  transition: 500ms ease;
  margin-bottom: 10px;
  &:hover {
    transition: 500ms ease;
    border-color: ${colors.events.hover};
    color: ${colors.events.hover};
  }
`;
const UrlButton = styled.div`
  display: none;
`;
const URLinput = styled.input`
  box-sizing: border-box;
  padding: 25px;
  border: 0;
  outline: 0;
  margin-bottom: 20px;
  width: 100%;
`;
const Container = styled.form`
  position: relative;
  img {
    width: 100%;
  }
  input {
    padding-left: 30px;
  }
`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const FileInput = styled.input`
  display: none;
  opacity: 0;
  outline: none;
  cursor: pointer;
`;
const ClosePhotoBtn = styled.button`
  position: absolute;
  font-size: 16px;
  border-radius: 5px;
  border: 0;
  background: white;
  padding: 7px;
  top: 0;
  right: 0;
  color: black;
  &:hover {
    color: red;
  }
`;
export default class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.isOpen,
      isUploaded: false,
      fromWeb: false,
      isSending: false,
      imageUrl: "",
      tags: [],
      inputUrl: "",
      innerWidth: window.innerWidth
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleOpenTextArea = this.handleOpenTextArea.bind(this);
    this.handleInputUrl = this.handleInputUrl.bind(this);
    this.inputDebounce = debounce(async function(e) {
      await this.getUrl();
    }, 500);
  }
  componentDidMount() {
    if (store.getState().newPostInterface.editingExistingPost === true) {
      this.setState({
        fromWeb: true,
        isUploaded: true,
        imageUrl: store.getState().newPost.photo[0]
      });
    }
  }
  async handleUpload(e) {
    this.setState({
      isSending: true
    });
    if (e.target.files[0].type === "image/gif") {
      store.dispatch(newPostType("gifs"));
    }
    await uploadFiles(e.target.files[0]).then(response => {
      this.setState({
        isUploaded: true,
        imageUrl: response,
        isSending: false
      });
    });
    store.dispatch(newPostPhoto(this.state.imageUrl));
    this.props.showForm();
  }
  handleOpenTextArea() {
    this.setState({
      fromWeb: true
    });
  }
  handleInputUrl(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    e.persist();
    this.inputDebounce(e);
    store.dispatch(newPostPhoto(e.target.value));
  }
  getUrl() {
    const re = /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))/i;
    if (re.test(this.state.inputUrl)) {
      this.setState({
        imageUrl: this.state.inputUrl,
        isUploaded: true
      });
      store.dispatch(newPostIsError(false));
      store.dispatch(newPostPhoto(this.state.imageUrl));
    } else {
      store.dispatch(newPostIsError(true));
      store.dispatch(
        newPostErrorMsg(
          "Unsupported link, it should have file name at the end."
        )
      );
      this.setState({
        isUploaded: false,
        imageUrl: "",
        fromWeb: false,
        inputUrl: ""
      });
    }

    this.props.showForm();
  }
  handleCancel = () => {
    this.setState({
      isUploaded: false,
      imageUrl: "",
      fromWeb: false,
      inputUrl: ""
    });
    store.dispatch(newPostPhotoDel());
  };

  render() {
    return (
      <Container>
        {this.state.isSending && <SpinnerOverlay />}
        {this.state.fromWeb &&
          this.state.isUploaded === false && (
            <URLinput
              placeholder="Paste a URL"
              name="inputUrl"
              onChange={this.handleInputUrl}
              value={this.state.inputUrl}
            />
          )}

        {this.state.fromWeb === false &&
          this.state.isUploaded === false && (
            <UploadContainer>
              <FileInputLabel for="file">
                <Icon icon={ic_insert_photo} size={50} />
                Upload photo
                <FileInput
                  type="file"
                  name="file"
                  onChange={this.handleUpload}
                />
              </FileInputLabel>
              <UrlInputLabel for="file" onClick={this.handleOpenTextArea}>
                <Icon icon={ic_public} size={50} />
                Add photo from web
                <UrlButton name="file" />
              </UrlInputLabel>
            </UploadContainer>
          )}
        {this.state.isUploaded && <img src={this.state.imageUrl} alt="post" />}

        {this.state.isUploaded && (
          <ClosePhotoBtn onClick={this.handleCancel}>X</ClosePhotoBtn>
        )}
        {this.state.isUploaded === false &&
          store.getState().newPostInterface.isForm === false && <CloseModal />}
      </Container>
    );
  }
}
