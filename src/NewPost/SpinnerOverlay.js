import React, { Component } from "react";
import Spinner from "../Components/Spinner";
import styled from "styled-components";
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: -20px;
  background-color: rgba(29, 49, 57, 0.6);
  div {
    svg {
      z-index: 4000;
    }
  }
`;

export default class SpinnerOverlay extends Component {
  render() {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
}
