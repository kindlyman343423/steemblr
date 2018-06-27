import React, { Component } from "react";
import sizeMe from "react-sizeme";
import styled from "styled-components";

import CardMedia from "./CardMedia";
import CardText from "./CardText";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  img {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0px;
  }
`;

class CardContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
    this.handleExpand = this.handleExpand.bind(this);
    this.style = {
      maxHeight: this.state.maxHeight,
      boxSizing: "border-box"
    };
    this.styleExpanded = {
      maxHeight: this.state.maxHeight,
      boxSizing: "border-box",
      color: "red"
    };
  }
  async handleExpand() {
    await this.setState({
      isExpanded: true,
      maxHeight: "unset"
    });
  }

  render() {
    return (
      <Container>
        <CardMedia json_metadata={this.props.json_metadata} />

        <CardText text={this.props.text} />
      </Container>
    );
  }
}

export default CardContent;
