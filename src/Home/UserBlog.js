import React, { Component } from "react";
import styled from "styled-components";
import BlogModal from "../Blog/BlogModal";
const Container = styled.div`
  box-sizing: border-box;
  margin-top: 3em;
  padding-top: 1.5px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Avatar = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  background: url(${props =>
    `https://steemitimages.com/u/${props.user}/avatar`});
  width: 75px;
  height: 75px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
`;
export default class UserBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBlogModalOpen: false
    };
  }
  handleClick = () => {
    this.setState({
      isBlogModalOpen: !this.state.isBlogModalOpen
    });
  };
  render() {
    return (
      <Container>
        {this.state.isBlogModalOpen ? (
          <BlogModal
            post={{
              author: this.props.user.profile.name,
              active: new Date(),
              permlink: ""
            }}
            isOpen={this.state.isBlogModalOpen}
            handleBlogModal={this.handleClick}
          />
        ) : (
          void 0
        )}
        <Avatar
          user={this.props.user.profile.name}
          onClick={this.handleClick}
        />
      </Container>
    );
  }
}
