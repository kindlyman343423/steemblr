import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import store from "../store";
import FollowBtn from "../Components/Post/FollowBtn";
import { getAccounts } from "../actions/getAccounts";
import PostsLoader from "./PostsLoader";
import { Link } from "react-router-dom";
const ModalStyle = {
  overlay: {
    backgroundColor: "rgba(80,80,80, 0.3)"
  },

  content: {
    top: 0,
    left: window.screen.width > 768 ? "50vw" : "15vw",
    right: 0,
    bottom: 0,
    borderRadius: 0,
    border: 0,
    boxSizing: "border-box",
    padding: 0
  }
};
const Container = styled.div`
  border-radius: 2px;
  background-color: rgba(
    ${props => props.backgroundColor.r},
    ${props => props.backgroundColor.g},
    ${props => props.backgroundColor.b},
    ${props => props.backgroundColor.a}
  );
  width: 100%;
  z-index: 600;
`;
const Banner = styled.div`
  background: url(${props => props.coverImage});
  box-sizing: border-box;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #b4b4b4;
  height: 350px;
  b {
    cursor: auto;
  }

  span {
    padding-left: 5px;
  }
  @media (max-width: 768px) {
    height: 200px;
  }
  @media (max-width: 425px) {
    height: 150px;
  }
`;
const BannerActions = styled.div`
  position: sticky;
  top: 0;
  z-index: 1100;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-bottom: -40px;
  color: #fff;
  background: linear-gradient(
    rgba(38, 50, 56, 0.2),
    rgba(38, 50, 56, 0.15),
    rgba(38, 50, 56, 0.01)
  );
  a {
    color: #fff;
  }
  button {
    margin-right: 0;
    color: #fff;
  }
  img {
    transform: scale(0.7, 0.7);
  }
  svg {
    cursor: pointer;
  }
  span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Avatar = styled.div`
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${props => props.avatarShape};
  width: 100px;
  height: 100px;
  position: absolute;
  left: calc(50% - 50px);
  margin-top: -60px;
  top: 0;
`;
const BlogTitle = styled.div`
  @font-face {
    font-family: ${props => props.font.family};
    src: url(${props => props.font.url});
  }
  box-sizing: border-box;
  margin-top: ${props => props.margin};
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  h1 {
    font-family: ${props => props.font.family}, ${props => props.font.category};
    font-size: 52px;
    margin-top: ${props => props.marginTop};
    margin-bottom: 20px;
  }
  p {
    margin-top: ${props => props.marginNoTitle};
    padding-left: 20px;
    padding-right: 20px;
    white-space: inherit;
    overflow: hidden;
  }
  color: rgba(
    ${props => props.titleColor.r},
    ${props => props.titleColor.g},
    ${props => props.titleColor.b},
    ${props => props.titleColor.a}
  );
`;
const Content = styled.div`
  box-sizing: border-box;
  margin-top: ${props => props.marginNoTitle};
  padding: 20px;
`;

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
    this.loadAccount(this.props.post.author);
  }
  async loadAccount(props) {
    await store.dispatch(getAccounts([props]));
    const search = store.getState().steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.post.author;
    });
    const coverImage =
      search[0] === undefined || search[0] === null || search[0] === ""
        ? void 0
        : search[0].cover_image;
    await this.setState({
      account: search[0],
      coverImageUrl: coverImage
    });
  }
  render() {
    const query = {
      author: this.props.post.author,
      startPermlink: this.props.post.permlink,
      beforeDate: this.props.post.active,
      initial: true
    };
    if (this.state.account === undefined) {
      return <div />;
    } else {
      return (
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.handleBlogModal}
          style={ModalStyle}
        >
          <Container backgroundColor={this.state.account.background_color}>
            <BannerActions>
              <Link to={"/@" + this.props.post.author}>
                {this.props.post.author}
              </Link>
              {this.props.isFollowing ? (
                void 0
              ) : (
                <FollowBtn onClick={this.props.handleFollowBtn}>
                  Follow
                </FollowBtn>
              )}
            </BannerActions>

            <Banner coverImage={this.state.account.cover_image} />

            <BlogTitle
              titleColor={this.state.account.title_color}
              font={this.state.account.title_font}
              margin={
                this.state.account.show_header_image === false &&
                this.state.account.show_avatar
                  ? "100px"
                  : "0px"
              }
              marginTop={
                this.state.account.show_avatar === false ? "40px" : "60px"
              }
              marginNoTitle={
                this.state.account.show_title === false ? "100px" : "0px"
              }
            >
              {this.state.account.show_avatar ? (
                <Avatar
                  url={`https://steemitimages.com/u/${
                    this.props.post.author
                  }/avatar`}
                  avatarShape={
                    this.state.account.avatar_shape === "circle" ? "50%" : 0
                  }
                />
              ) : (
                void 0
              )}
              {this.state.account.show_title ? (
                <h1>
                  {this.state.account === undefined
                    ? void 0
                    : this.state.account.name}
                </h1>
              ) : (
                void 0
              )}
              {this.state.account.show_description ? (
                <p>
                  {this.state.account === undefined
                    ? void 0
                    : this.state.account.about}
                </p>
              ) : (
                void 0
              )}
            </BlogTitle>
            <Content>
              <PostsLoader query={query} />
            </Content>
          </Container>
        </Modal>
      );
    }
  }
}
