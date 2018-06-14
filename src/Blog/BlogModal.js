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
  background-color: white;
  width: 100%;
  z-index: 600;
`;
const Banner = styled.div`
  background: url(${props => props.coverImage});
  box-sizing: border-box;
  position: relative;
  background-size: cover;
  background-color: #b4b4b4;
  height: 250px;
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
  z-index: 1500;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-bottom: -40px;
  color: #fff;
  background: linear-gradient(
    rgba(38, 50, 56, 0.5),
    rgba(38, 50, 56, 0.4),
    rgba(38, 50, 56, 0.12)
  );
  button {
    margin-right: 0;
    color: #fff;
  }
  a {
    color: #fff;
  }
`;

const Avatar = styled.div`
  background: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  position: absolute;
  left: calc(50% - 40px);
  margin-bottom: -40px;
  bottom: 0;
`;
const BlogTitle = styled.div`
  box-sizing: border-box;
  margin-top: 50px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;

  b {
    cursor: inherit;
    font-size: 24px;
  }
  p {
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    white-space: inherit;
    overflow: hidden;
  }
`;
const Content = styled.div`
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
      return acc.name === this.props.post.author;
    });
    const coverImage =
      search[0] === undefined ||
      search[0] === null ||
      search[0] === "" ||
      search[0].json_metadata === "" ||
      search[0].json_metadata === "{}" ||
      JSON.parse(search[0].json_metadata).profile.cover_image === undefined
        ? void 0
        : JSON.parse(search[0].json_metadata).profile.cover_image;
    await this.setState({
      account: search,
      coverImageUrl: coverImage
    });
  }
  render() {
    const jsonMetadata =
      this.state.account === undefined ||
      this.state.account[0].json_metadata === "" ||
      this.state.account[0].json_metadata === "{}"
        ? ""
        : JSON.parse(this.state.account[0].json_metadata);
    const query = {
      author: this.props.post.author,
      startPermlink: this.props.post.permlink,
      beforeDate: this.props.post.active,
      initial: true
    };
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.handleBlogModal}
        style={ModalStyle}
      >
        <Container>
          <BannerActions>
            <Link to={"/@" + this.props.post.author}>
              {this.props.post.author}
            </Link>
            {this.props.isFollowing ? (
              void 0
            ) : (
              <FollowBtn onClick={this.props.handleFollowBtn}>Follow</FollowBtn>
            )}
          </BannerActions>

          <Banner coverImage={this.state.coverImageUrl}>
            <Avatar
              url={`https://steemitimages.com/u/${
                this.props.post.author
              }/avatar`}
            />
          </Banner>
          <BlogTitle>
            <b>{jsonMetadata === "" ? void 0 : jsonMetadata.profile.name}</b>
            <p>{jsonMetadata === "" ? void 0 : jsonMetadata.profile.about}</p>
          </BlogTitle>
          <Content>
            <PostsLoader query={query} />
          </Content>
        </Container>
      </Modal>
    );
  }
}
