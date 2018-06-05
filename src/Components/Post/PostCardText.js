import React, { Component } from "react";
import sizeMe from "react-sizeme";
import styled from "styled-components";
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;

  padding-left: 20px;
  padding-right: 20px;
  img {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0px;
  }
`;
const ExpandBtn = styled.button`
  font-family: "Roboto", sans-serif;
  position: absolute;
  cursor: pointer;
  bottom: 0;
  border: 0;
  outline: 0;
  left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 500;
  width: 100%;
  font-size: 16px;
  font-weight: 200;
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
    const { height } = this.props.size;

    return (
      <Container style={{ maxHeight: this.state.maxHeight }}>
        {this.props.text}
        {height >= 350 && this.state.isExpanded !== true ? (
          <ExpandBtn onClick={this.handleExpand}>Expand</ExpandBtn>
        ) : (
          void 0
        )}
      </Container>
    );
  }
}

export default sizeMe({ monitorHeight: true })(PostCardText);
