import React, { Component } from "react";
import sizeMe from "react-sizeme";
import styled from "styled-components";

import CardMedia from "./CardMedia";
import CardText from "./CardText";
import CardVideo from "./CardVideo";
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
class CardContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: this.props.section === "home" ? true : false,
      maxHeight: this.props.section === "home" ? "unset" : "450px"
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
  handleMedia = props => {
    switch (props) {
      case "text":
        void 0;
        break;
      case "photos":
        return <CardMedia json_metadata={this.props.json_metadata} />;
      case "gifs":
        return <CardMedia json_metadata={this.props.json_metadata} />;
      case "audio":
        return (
          <CardVideo
            text={this.props.text}
            json_metadata={this.props.json_metadata}
          />
        );
      case "video":
        return (
          <CardVideo
            text={this.props.text}
            json_metadata={this.props.json_metadata}
          />
        );
      default:
        void 0;
    }
  };
  render() {
    const { height } = this.props.size;
    return (
      <Container style={{ maxHeight: this.state.maxHeight }}>
        {this.handleMedia(this.props.post_type)}
        {this.props.text.length === 0 ? (
          void 0
        ) : (
          <CardText text={this.props.text} post_type={this.props.post_type} />
        )}
        {height >= 450 && this.state.isExpanded !== true ? (
          <ExpandBtn onClick={this.handleExpand}>Expand</ExpandBtn>
        ) : (
          void 0
        )}
      </Container>
    );
  }
}

export default sizeMe({ monitorHeight: true })(CardContent);
