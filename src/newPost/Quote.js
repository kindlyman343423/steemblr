import React, { Component } from "react";
import { Editor, createEditorState } from "medium-draft";
import CustomImageSideButton from "./ImageSideButton";
import styled, { injectGlobal } from "styled-components";
import Modal from "react-modal";
import mediumDraftExporter from "medium-draft/lib/exporter";
import TagsInput from "react-tagsinput";
import store from "../store";
import CloseBtn from "../Components/CloseBtn";
import SendBtn from "../Components/SendBtn";
import newQuote from "../Functions/newQuote";
import uuidv4 from "uuid/v4";
import "./reactTagsInput.css";

injectGlobal`
  .title {
    font-size: 32px;
    height: 36px;
    outline: none;
    border: 0;
    margin-bottom: 10px;
    font-family: "Roboto", sans-serif;
    font-weight: 200;
  }
  .md-editor-toolbar {
    margin-left: 120px;
  }
  .title:focus {
    outline: none;
    border: 0;
  }
`;
const modalStyle = {
  postion: "fixed",
  height: "100%",

  overlay: {
    backgroundColor: "rgba(28, 49, 58, 0.90)"
  },
  content: {
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    width: "40vw",
    bottom: "none",
    maxHeight: "60vh",
    border: "0",
    transform: "translate(-50%, -50%)"
  }
};
const BeneficiariesContainer = styled.div`
  box-sizing: border-box;
  padding: 10px;
  b {
    font-weight: 700;
  }
  box-sizing: border-box;
`;
const BeneficiariesFormContainer = styled.div`
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 60% 23.8% auto;
`;
const BeneficiariesInput = styled.input`
  border: 0;
  outline: 0;
`;
const AddBtn = styled.button`
  cursor: pointer;
  outline: none;
  align-self: flex-end;
  float: right;
  padding: 10px;
  border: 0;
  background-color: transparent;
  outline: none;
  color: black;
  font-weight: 700;
  transition: 0.5s;
  &:active {
    background-color: #1c313a;
    transition: 0.1s;
  }
`;
const DeleteBtn = styled.button`
  outline: none;
  float: right;
  padding: 10px;
  border: 0;
  background-color: transparent;
  outline: none;
  color: black;
  font-weight: 700;
  transition: 0.1s;
  &:active {
    color: red;
    transition: 0.1s;
  }
`;
const OpenBeneficiariesBtn = styled.button`
  outline: none;
  padding: 10px;
  border: 0;
  background-color: transparent;
  outline: none;
  color: black;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:active {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;
export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().steemProfile.profile.user,
      open: this.props.isOpen,
      editorState: createEditorState(),
      tags: [],
      title: "",
      type: "quote",
      beneficiaries: [],
      beneficiary: "",
      beneficiaryPercent: "",
      beneficiariesOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBeneficiaries = this.handleBeneficiaries.bind(this);
    this.handleDeleteBeneficiary = this.handleDeleteBeneficiary.bind(this);
    this.openBeneficiaries = this.openBeneficiaries.bind(this);
    this.sideButtons = [
      {
        title: "Image",
        component: CustomImageSideButton
      }
    ];
  }
  onChange = editorState => {
    this.setState({ editorState });
  };

  componentWillUnmount() {
    this.setState({
      open: true
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleOpen() {
    this.setState({
      open: true
    });
  }
  handleClose() {
    this.setState({
      open: false
    });
    this.props.unMountChildren("quote");
  }
  handleSend() {
    const content = mediumDraftExporter(
      this.state.editorState.getCurrentContent()
    );
    /*newQuote(
      this.state.user,
      this.state.title,
      content,
      this.state.beneficiaries,
      this.state.tags
    );*/

    if (this.state.beneficiaries.length >= 1) {
      const newContent =
        `<p>Beneficiaries of this post: ${this.state.beneficiaries.map(user => {
          return `${" " + user.account + " " + user.weight / 100 + "%"}`;
        })}</p>` + content;
      newQuote(
        this.state.user,
        this.state.title,
        newContent,
        this.state.beneficiaries,
        this.state.tags
      );
    } else {
      newQuote(
        this.state.user,
        this.state.title,
        content,
        this.state.beneficiaries,
        this.state.tags
      );
    }
  }
  openBeneficiaries() {
    this.setState({
      beneficiariesOpen: true
    });
  }
  async handleTagsChange(props) {
    await this.setState({ tags: props });
  }
  handleBeneficiaries() {
    const user = [
      {
        account: this.state.beneficiary,
        weight: this.state.beneficiaryPercent * 100
      }
    ];
    const newState = this.state.beneficiaries.concat(user);
    this.setState({
      beneficiaries: newState,
      beneficiary: "",
      beneficiaryPercent: ""
    });
  }
  handleDeleteBeneficiary(props) {
    const newState = this.state.beneficiaries.filter(user => {
      return user.account !== props.account;
    });
    this.setState({
      beneficiaries: newState
    });
  }
  render() {
    const { editorState } = this.state;
    return (
      <Modal isOpen={this.state.open} style={modalStyle}>
        <input
          className="title"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleInputChange}
        />
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          sideButtons={this.sideButtons}
          placeholder="Quote"
        />
        {this.state.beneficiariesOpen ? (
          void 0
        ) : (
          <OpenBeneficiariesBtn onClick={this.openBeneficiaries}>
            Add Beneficiaries
          </OpenBeneficiariesBtn>
        )}
        {this.state.beneficiaries.length >= 1 ? (
          <BeneficiariesContainer>
            <b>Post beneficiaries:</b>
            {this.state.beneficiaries.map(user => {
              return (
                <p key={uuidv4()}>
                  <DeleteBtn onClick={() => this.handleDeleteBeneficiary(user)}>
                    X
                  </DeleteBtn>
                  {user.account} {user.weight / 100 + "%"}
                </p>
              );
            })}
          </BeneficiariesContainer>
        ) : (
          void 0
        )}
        {this.state.beneficiariesOpen ? (
          <BeneficiariesFormContainer>
            <BeneficiariesInput
              name="beneficiary"
              placeholder="Steemit username"
              type="text"
              value={this.state.beneficiary}
              onChange={this.handleInputChange}
            />
            <BeneficiariesInput
              name="beneficiaryPercent"
              placeholder="Beneficiary %"
              type="number"
              min="1"
              max="100"
              value={this.state.beneficiaryPercent}
              onChange={this.handleInputChange}
            />
            <AddBtn onClick={this.handleBeneficiaries}>Add Beneficiary</AddBtn>
          </BeneficiariesFormContainer>
        ) : (
          void 0
        )}
        <TagsInput
          name="tags"
          value={this.state.tags}
          onChange={this.handleTagsChange}
        />
        <span styles="width: 100%">
          <CloseBtn onClick={this.handleClose}>Close</CloseBtn>
          <SendBtn onClick={this.handleSend}>Send</SendBtn>
        </span>
      </Modal>
    );
  }
}
