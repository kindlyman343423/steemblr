import React, { Component } from "react";
import ActionsList from "Components/Post/Footer/ActionsList";
import styled from "styled-components";

const Container = styled.section`
  button {
    font-weight: 500;
    font-size: 14px;
    height: 35px;
    color: #000;
    background-color: transparent;
    border-bottom: 1px solid #e2e3e2;
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
export default class ActionsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      innerWidth: window.innerWidth
    };
  }
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    const { post } = this.props;
    return (
      <Container>
        <ActionsList post={post} />
      </Container>
    );
  }
}
