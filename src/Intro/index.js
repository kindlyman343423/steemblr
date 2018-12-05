import React, { Component } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";

import Header from "./Header";
import Buttons from "./Buttons";
import Welcome from "./Welcome";
import About from "./About";
import BuzzWords from "./BuzzWords";
import store from "../store";
import { Redirect } from "react-router-dom";
import SectionIndicator from "./SectionIndicator";

const Container = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  position: relative;
`;

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section: 1
    };
  }

  handleWaypoints = props => {
    this.setState({
      section: props
    });
  };
  render() {
    return (
      <Container>
        {store.getState().login.status ? <Redirect to="/home" /> : void 0}
        <Header />
        {this.state.section !== 1 && <Buttons />}
        <SectionIndicator section={this.state.section} />

        <Welcome handleWaypoints={this.handleWaypoints} />
        <About handleWaypoints={this.handleWaypoints} />
        <BuzzWords handleWaypoints={this.handleWaypoints} />
      </Container>
    );
  }
}

export default hot(module)(Intro);
