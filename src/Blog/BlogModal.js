import React, { Component } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import store from "../store";
import FollowBtn from "../Components/Post/FollowBtn";
import { getAccounts } from "../actions/steemActions";
import PostsLoader from "./PostsLoader";
const ModalStyle = {
  overlay: {
    backgroundColor: "rgba(80,80,80, 0.3)"
  },

  content: {
    top: 0,
    left: "50vw",
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
  height: 300px;
  b {
    cursor: auto;
  }
  span {
    padding-left: 5px;
  }
`;
const BannerActions = styled.div`
  box-sizing: border-box;
  padding: 5px;
  padding-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  color: #fff;
  background: linear-gradient(
    rgba(38, 50, 56, 0.5),
    rgba(38, 50, 56, 0.3),
    rgba(38, 50, 56, 0.02)
  );
  button {
    margin-right: 0;
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
    //Checking store for profile info, if profile not found calling api/db and dispatching to store
    const search = store.getState().steemAccounts.accounts.filter(acc => {
      return acc.name === this.props.post.author;
    });
    const coverImage =
      search[0] === undefined || search[0].json_metadata === ""
        ? void 0
        : JSON.parse(search[0].json_metadata).profile.cover_image;
    await this.setState({
      account: search,
      coverImageUrl: coverImage
    });
    if (search.length !== 0) {
      const coverImage =
        search[0] === undefined || search[0].json_metadata === ""
          ? void 0
          : JSON.parse(search[0].json_metadata).profile.cover_image;
      await this.setState({
        account: search,
        coverImageUrl: coverImage
      });
    } else {
      await store.dispatch(getAccounts([props]));
      const search = store.getState().steemAccounts.accounts.filter(acc => {
        return acc.name === this.props.post.author;
      });
      const coverImage =
        search[0] === undefined || search[0].json_metadata === ""
          ? void 0
          : JSON.parse(search[0].json_metadata).profile.cover_image;
      await this.setState({
        account: search,
        coverImageUrl: coverImage
      });
    }
  }
  render() {
    const jsonMetadata =
      this.state.account === undefined ||
      this.state.account[0].json_metadata === ""
        ? void 0
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
          <Banner coverImage={this.state.coverImageUrl}>
            <BannerActions>
              <span>{this.props.post.author}</span>
              {this.props.isFollowing ? (
                void 0
              ) : (
                <FollowBtn onClick={this.props.handleFollowBtn}>
                  Follow
                </FollowBtn>
              )}
            </BannerActions>
            <Avatar
              url={`https://steemitimages.com/u/${
                this.props.post.author
              }/avatar`}
            />
          </Banner>
          <BlogTitle>
            <b>
              {jsonMetadata === undefined ? void 0 : jsonMetadata.profile.name}
            </b>
            <p>
              {jsonMetadata === undefined ? void 0 : jsonMetadata.profile.about}
            </p>
          </BlogTitle>
          <Content>
            <PostsLoader query={query} />
          </Content>
        </Container>
      </Modal>
    );
  }
}
