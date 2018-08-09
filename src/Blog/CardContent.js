import React, { Component } from "react";
import styled from "styled-components";

import CardMedia from "./CardMedia";
import CardVideo from "../Components/Post/CardVideo";
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
        break;
      case "video":
        return (
          <CardVideo
            json_metadata={this.props.json_metadata}
            text={this.props.text}
          />
        );
      default:
        void 0;
    }
  };
  render() {
    return (
      <Container>
        {this.handleMedia(this.props.post_type)}

        <CardText text={this.props.text} />
      </Container>
    );
  }
}

export default CardContent;
