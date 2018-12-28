import React, { Component } from "react";
import styled from "styled-components";
import BlogModal from "../Blog/BlogModal";
import getAvatarURL from "../Functions/getAvatarURL";
const Container = styled.div`
  box-sizing: border-box;
  margin-top: 3em;
  padding-top: 1.5px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  grid-area: userBlog;
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 425px) {
    display: none;
  }
`;
const Avatar = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  background: url(${props => props.url});
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
      isBlogModalOpen: false,
      avatarURL: ""
    };
  }
  async componentDidMount() {
    const platform = this.props.platform;
    const username = this.props.username;
    const avatarURL = await getAvatarURL(platform, username);
    this.setState({
      avatarURL: avatarURL
    });
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
              author: this.props.username,
              active: new Date(),
              permlink: ""
            }}
            isOpen={this.state.isBlogModalOpen}
            handleBlogModal={this.handleClick}
          />
        ) : (
          void 0
        )}
        <Avatar url={this.state.avatarURL} onClick={this.handleClick} />
      </Container>
    );
  }
}
