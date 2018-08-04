import React, { Component } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
class Spinner extends Component {
  render() {
    const Container = styled.div`
      box-sizing: border-box;
      margin-top: ${this.props.marginTop}em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      svg {
        margin: 0px;
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
