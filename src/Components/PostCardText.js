import React, { Component } from "react";
import { CardText } from "material-ui/Card";
import sizeMe from "react-sizeme";
import styled from "styled-components";
const ExpandBtn = styled.button`
  font-family: "Roboto", sans-serif;
  position: absolute;
  cursor: pointer;
  bottom: 0;
  border: 0;
  outline: 0;
  left: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 500;
  width: 100%;
  font-size: 16px;
  font-weight: 300;
`;
class PostCardText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      maxHeight: "600px"
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
      <CardText style={{ maxHeight: this.state.maxHeight }}>
        {this.props.text}
        {height >= 600 && this.state.isExpanded !== true ? (
          <ExpandBtn onClick={this.handleExpand}>Expand</ExpandBtn>
        ) : (
          void 0
        )}
      </CardText>
    );
  }
}

export default sizeMe({ monitorHeight: true })(PostCardText);
