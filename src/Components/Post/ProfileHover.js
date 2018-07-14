import React, { Component } from "react";
import styled from "styled-components";
import FollowBtn from "./FollowBtn";
import store from "../../store";
import { getAccounts } from "../../actions/getAccounts";
import { Link } from "react-router-dom";
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
const Header = styled.div`
  background: url(${props => props.coverImage});
  box-sizing: border-box;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #b4b4b4;
  height: 150px;

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
  width: 70px;
  height: 70px;
  position: absolute;
  left: calc(50% - 35px);
  margin-bottom: -35px;
  bottom: 0;
  border-radius: ${props => props.avatarShape};
`;
const Content = styled.div`
  @font-face {
    font-family: ${props => props.font.family};
    src: url(${props => props.font.url});
  }

  box-sizing: border-box;
  margin-top: ${props => props.marginTop};
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
`;
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
    await this.setState({
      account: search[0],
      coverImageUrl: coverImage
    });
  }
  render() {
    if (this.state.account === undefined) {
      return <div />;
    } else {
      return (
        <Container
          onMouseOver={this.props.handleProfileDivHover}
          onMouseLeave={this.props.handleProfileHover}
          backgroundColor={this.state.account.background_color}
        >
          <Header coverImage={this.state.account.cover_image}>
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
            {this.state.account.show_avatar ? (
              <Avatar
                url={`https://steemitimages.com/u/${this.props.author}/avatar`}
                avatarShape={
                  this.state.account.avatar_shape === "circle" ? "50%" : 0
                }
              />
            ) : (
              void 0
            )}
          </Header>
          <Content
            titleColor={this.state.account.title_color}
            font={this.state.account.title_font}
            marginTop={this.state.account.show_avatar ? "50px" : "10px"}
          >
            <b>
              {this.state.account === undefined
                ? void 0
                : this.state.account.name}
            </b>
            <p>
              {this.state.account === undefined
                ? void 0
                : this.state.account.about}
            </p>
          </Content>
        </Container>
      );
    }
  }
}
