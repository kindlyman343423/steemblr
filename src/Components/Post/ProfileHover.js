import React, { Component } from "react";
import styled from "styled-components";
import FollowBtn from "./FollowBtn";
import store from "../../store";
import { getAccounts } from "../../actions/steemActions";
const Container = styled.div`
  border-radius: 2px;
  background-color: white;
  position: absolute;
  width: 25vw;
  margin-top: -20px;
  top: 0;
  height: 300px;
  z-index: 600;
`;
const Header = styled.div`
  background: url(${props => props.coverImage});
  box-sizing: border-box;
  position: relative;
  background-size: cover;
  background-color: #b4b4b4;
  height: 40%;

  span {
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
  width: 80px;
  height: 80px;
  position: absolute;
  left: calc(50% - 40px);
  margin-bottom: -40px;
  bottom: 0;
`;
export default class ProfileHover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: undefined,
      author: this.props.author
    };
    this.loadAccount(this.props.author);
    console.log("Contructor");
  }
  async loadAccount(props) {
    const search = store.getState().steemAccounts.accounts.filter(acc => {
      return acc.name === this.props.author;
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
        return acc.name === this.props.author;
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
    return (
      <Container onMouseLeave={this.props.handleProfileHover}>
        <Header coverImage={this.state.coverImageUrl}>
          <HeaderActions>
            <span>{this.props.author}</span> <FollowBtn>Follow</FollowBtn>
          </HeaderActions>
          <Avatar
            url={`https://steemitimages.com/u/${this.props.author}/avatar`}
          />
        </Header>
      </Container>
    );
  }
}
