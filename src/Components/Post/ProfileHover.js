import React, { Component } from "react";
import styled from "styled-components";
import FollowBtn from "./FollowBtn";
import store from "../../store";
import { getAccounts } from "../../actions/getAccounts";
import { Link } from "react-router-dom";
import getAvatarURL from "../../Functions/getAvatarURL";
const Container = styled.div`
  border-radius: 2px;
  background-color: white;
  position: absolute;
  width: 300px;
  margin-top: -20px;
  top: 80px;
  z-index: 600;
  background-color: rgba(
    ${props => props.backgroundColor.r},
    ${props => props.backgroundColor.g},
    ${props => props.backgroundColor.b},
    ${props => props.backgroundColor.a}
  );
  @media (max-width: 768px) {
    display: none;
    width: 250px;
  }
`;
const InsideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
`;
const Header = styled.div`
  background: url(${props => props.coverImage});
  box-sizing: border-box;
  position: absolute;
  top: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #b4b4b4;
  height: 150px;
  width: 100%;
  b {
    cursor: auto;
  }
  a {
    color: white;
    padding-left: 5px;
  }
`;
const HeaderActions = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  z-index: 200;
  padding: 10px;
  padding-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  color: #fff;
  a {
    color: #fff;
    text-decoration: none;
  }
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
  width: 70px;
  height: 70px;
  position: absolute;
  left: calc(50% - 35px);
  top: ${props => props.topPosition};
  z-index: 200;
  border-radius: ${props => props.avatarShape};
`;
const Content = styled.div`
  @font-face {
    font-family: ${props => props.font.family};
    src: url(${props => props.font.url});
  }
  padding-top: ${props => props.paddingTop};
  position: relative;
  box-sizing: border-box;
  margin-top: 0;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;

  b {
    font-family: ${props => props.font.family}, ${props => props.font.category};
    cursor: inherit;
    font-size: 24px;
  }
  p {
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    white-space: inherit;
    overflow: hidden;
    color: rgba(
      ${props => props.titleColor.r},
      ${props => props.titleColor.g},
      ${props => props.titleColor.b},
      ${props => props.titleColor.a}
    );
  }
  color: rgba(
    ${props => props.titleColor.r},
    ${props => props.titleColor.g},
    ${props => props.titleColor.b},
    ${props => props.titleColor.a}
  );
`;
/*
const FeaturedPosts = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
`;
const Post = styled.div`
  background-color: #e2e1e2;
  width: calc(18vw / 3.2);
  height: calc(18vw / 3.2);
`;*/
export default class ProfileHover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: undefined,
      author: this.props.author,
      jsonMetadata: ""
    };
    this.loadAccount(this.props.author);
  }
  async loadAccount(props) {
    await store.dispatch(getAccounts([props]));
    const search = store.getState().steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.author;
    });
    const coverImage =
      search[0] === undefined || search[0] === null || search[0] === ""
        ? void 0
        : search[0].cover_image;
    const platform = search[0].platform;
    const URL = await getAvatarURL(platform, search[0].author);
    await this.setState({
      account: search[0],
      coverImageUrl: coverImage,
      url: URL
    });
  }
  render() {
    const { account, url } = this.state;
    if (this.state.account === undefined) {
      return <div />;
    } else {
      return (
        <Container
          onMouseOver={this.props.handleProfileDivHover}
          onMouseLeave={this.props.handleProfileHover}
          backgroundColor={account.background_color}
        >
          <InsideContainer>
            {account.show_header_image && (
              <Header coverImage={account.cover_image} />
            )}

            <HeaderActions>
              <Link to={"/@" + this.props.author}>{this.props.author}</Link>
              {this.props.isFollowing ? (
                void 0
              ) : (
                <FollowBtn onClick={this.props.handleFollowBtn}>
                  Follow
                </FollowBtn>
              )}
            </HeaderActions>

            <Content
              titleColor={account.title_color}
              font={account.title_font}
              marginTop={account.show_avatar ? "0px" : "10px"}
              paddingTop={
                account.show_header_image && account.show_avatar
                  ? "180px"
                  : account.show_header_image === false &&
                    account.show_avatar === false
                    ? "70px"
                    : "120px"
              }
            >
              {account.show_avatar && (
                <Avatar
                  url={url}
                  avatarShape={account.avatar_shape === "circle" ? "50%" : 0}
                  topPosition={account.show_header_image ? "100px" : "35px"}
                />
              )}
              <b>{account === undefined ? void 0 : account.name}</b>
              <p>{account === undefined ? void 0 : account.about}</p>
            </Content>
          </InsideContainer>
        </Container>
      );
    }
  }
}
