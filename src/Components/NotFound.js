import React, { Component } from "react";
import Icon from "react-icons-kit";
import { ic_cancel } from "react-icons-kit/md/ic_cancel";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
  font-size: 32px;
  a {
    color: grey;
  }
`;
export default class NotFound extends Component {
  render() {
    return (
      <Container>
        <Icon icon={ic_cancel} size={100} />
        <p>This page doesn't exist.</p>
        <p>
          Return to <Link to="/">homepage</Link>
        </p>
      </Container>
    );
  }
}
