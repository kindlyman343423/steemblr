import React, { Component } from "react";
import styled from "styled-components";
import Lightbox from "react-image-lightbox";
import PropTypes from "prop-types";
const Img = styled.img`
  cursor: pointer;
  width: 100%;
`;

export default class CardMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      photoIndex: 0,
      isOpen: false,
      images: []
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  componentDidMount() {
    const { post } = this.props;
    if (post !== undefined && post.platform === "steem") {
      this.setState({
        data: JSON.parse(post.json_metadata).image
      });
    } else if (post !== undefined && post.platform === "email") {
      this.setState({
        data: post.photo
      });
    }
  }
  handleOpen() {
    this.loadImages();
    this.setState({
      isOpen: true
    });
  }
  async loadImages() {
    await this.setState({
      images: this.state.data
    });
  }
  render() {
    const { images, data, photoIndex, isOpen } = this.state;
    return (
      <div>
        <Img src={data[0]} onClick={this.handleOpen} />
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
      </div>
    );
  }
}
CardMedia.propTypes = {
  post: PropTypes.object
};
