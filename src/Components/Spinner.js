import React, { Component } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
class Spinner extends Component {
  render() {
    const Container = styled.div`
      margin-top: ${this.props.marginTop}em;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        color: #cfd8dc;
      }
    `;
    return (
      <Container>
        <CircularProgress size={50} />
      </Container>
    );
  }
}

export default Spinner;
