import React, { Component } from "react";
import styled from "styled-components";
const Container = styled.div`
  position: fixed;
  left: 25px;
  top: 40%;
  z-index: 20;
  div {
    background: transparent;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    width: 3px;
    height: 3px;
    margin-top: 10px;
    padding: 5px;
    transition: 0.5s;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;
export default class SectionIndicator extends Component {
  render() {
    return (
      <Container>
        <a href="#welcome-section">
          <div
            style={{
              background: this.props.section === 1 ? "white" : "transparent"
            }}
          />
        </a>
        <a href="#about-section">
          <div
            style={{
              background: this.props.section === 2 ? "white" : "transparent"
            }}
          />
        </a>
        <a href="#buzzwords-section">
          <div
            style={{
              background: this.props.section === 3 ? "white" : "transparent"
            }}
          />
        </a>
      </Container>
    );
  }
}
