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
      color: #cfd8dc;
    `;
    return (
      <Container>
        <CircularProgress color="#cfd8dc" size={50} />
      </Container>
    );
  }
}

export default Spinner;
