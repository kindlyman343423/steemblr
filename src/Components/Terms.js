import React, { Component } from "react";
import TermsOfService from "./TermsOfService";
import styled from "styled-components";

const Container = styled.div`
  text-align: left;
  padding: 50px;
  color: #fff;
  h2,
  h3 {
    font-weight: 500;
  }
`;
export default class Terms extends Component {
  render() {
    return (
      <Container>
        <TermsOfService />
      </Container>
    );
  }
}
