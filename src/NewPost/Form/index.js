import React, { Component } from "react";
import styled from "styled-components";
import TextEditor from "./TextEditor";
import Tags from "./Tags";
import Title from "./Title";
import CloseBtn from "../../Components/CloseBtn";
import SendBtn from "../../Components/SendBtn";
import SpinnerOverlay from "../SpinnerOverlay";
const Form = styled.form`
  box-sizing: border-box;
  position: relative;

  img {
    width: 100%;
  }
`;
const Buttons = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-left: 20px;
  padding-right: 30px;
`;
export default class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSending: this.props.isSending
    };
  }

  render() {
    return (
      <Form onSubmit={this.handleSend}>
        {this.state.isSending ? <SpinnerOverlay /> : void 0}
        <Title />
        <TextEditor />
        <Tags />
        <Buttons>
          <CloseBtn onClick={this.props.handleClose}>Close</CloseBtn>
          <SendBtn type="submit" value="submit">
            Send
          </SendBtn>
        </Buttons>
      </Form>
    );
  }
}
