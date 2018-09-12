import React, { Component } from "react";
import styled from "styled-components";
const Container = styled.div`
  box-sizing: border-box;
  padding: 10px;
  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
export default class SearchTerm extends Component {
  render() {
    return <Container>{this.props.tag}</Container>;
  }
}
