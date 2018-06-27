import React, { Component } from "react";
import styled from "styled-components";
import Lightbox from "react-image-lightbox";
const Img = styled.img`
  cursor: pointer;
  width: 100%;
  height: auto;
`;

export default class CardMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      json_metadata: JSON.parse(this.props.json_metadata),
      photoIndex: 0,
      isOpen: false,
      images: []
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen() {
    this.loadImages();
    this.setState({
      isOpen: true
    });
  }
  async loadImages() {
    await this.setState({
      images: this.state.json_metadata.image
    });
  }
  render() {
    const { images } = this.state;
    return (
      <div>
        <Img
          src={this.state.json_metadata.image[0]}
          onClick={this.handleOpen}
        />
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.images[this.state.photoIndex]}
            nextSrc={images[(this.state.photoIndex + 1) % images.length]}
            prevSrc={
              images[
                (this.state.photoIndex + images.length - 1) % images.length
              ]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (this.state.photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (this.state.photoIndex + 1) % images.length
              })
            }
          />
        )}
      </div>
    );
  }
}
