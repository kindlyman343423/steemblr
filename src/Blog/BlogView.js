import React, { Component } from "react";
import styled from "styled-components";
import store from "../store";

import SideMenu from "../Header/SideMenu";
import FollowBtn from "../Components/Post/FollowBtn";
import Spinner from "../Components/Spinner";
import { getAccounts } from "../actions/getAccounts";
import PostsLoader from "./PostsLoader";
import logo from "../icons/logo.svg";
import { Link } from "react-router-dom";
const Container = styled.div`
  border-radius: 2px;
  width: 100%;
  z-index: 600;
  background-color: rgba(
    ${props => props.backgroundColor.r},
    ${props => props.backgroundColor.g},
    ${props => props.backgroundColor.b},
    ${props => props.backgroundColor.a}
  );
`;
const Banner = styled.div`
  background: url(${props => props.coverImage});
  box-sizing: border-box;
  position: relative;
  background-attachment: fixed;
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
    rgba(38, 50, 56, 0.5),
    rgba(38, 50, 56, 0.4),
    rgba(38, 50, 56, 0.12)
  );
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
  margin-bottom: -35px;
  bottom: 0;
`;
const BlogTitle = styled.div`
  box-sizing: border-box;
  margin-top: 60px;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 52px;
    margin: 0;
  }
  p {
    padding-top: 10px;
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
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export default class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
    this.loadAccount(this.props.match.params.username);
  }
  async loadAccount(props) {
    await store.dispatch(getAccounts([props]));
    const search = store.getState().steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.match.params.username;
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
      author: this.props.match.params.username,
      startPermlink: "",
      beforeDate: "2018-06-12T16:49:32",
      initial: true
    };
    if (this.state.account === undefined) {
      return <Spinner />;
    } else {
      return (
        <Container backgroundColor={this.state.account.background_color}>
          <BannerActions>
            <span>
              {store.getState().login.status ? <SideMenu /> : false}
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </span>
            {this.props.isFollowing ? (
              void 0
            ) : (
              <FollowBtn onClick={this.props.handleFollowBtn}>Follow</FollowBtn>
            )}
          </BannerActions>

          <Banner coverImage={this.state.coverImageUrl}>
            <Avatar
              url={`https://steemitimages.com/u/${
                this.props.match.params.username
              }/avatar`}
              avatarShape={
                this.state.account.avatar_shape === "circle" ? "50%" : 0
              }
            />
          </Banner>
          <BlogTitle titleColor={this.state.account.title_color}>
            <h1>
              {this.state.account === undefined
                ? void 0
                : this.state.account.name}
            </h1>
            <p>
              {this.state.account === undefined
                ? void 0
                : this.state.account.about}
            </p>
          </BlogTitle>
          <Content>
            <PostsLoader
              key={this.props.location.key}
              query={query}
              componentLocation={"blog"}
            />
          </Content>
        </Container>
      );
    }
  }
}
