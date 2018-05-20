import React, { Component } from "react";
import CircularProgress from "material-ui/CircularProgress";
import styled from "styled-components";

class Spinner extends Component {
  constructor(props) {
    super(props);

    this.Container = styled.div`
      margin-top: ${this.props.marginTop}em;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
  }

  render() {
    return (
      <this.Container>
        <CircularProgress color="#cfd8dc" />
      </this.Container>
    );
  }
}

export default Spinner;
