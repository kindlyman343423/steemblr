import React, { Component } from "react";
import sizeMe from "react-sizeme";
import styled from "styled-components";
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  img {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0px;
  }
`;

class PostCardText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      maxHeight: "350px"
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
    return <Container>{this.props.text}</Container>;
  }
}

export default sizeMe({ monitorHeight: true })(PostCardText);
