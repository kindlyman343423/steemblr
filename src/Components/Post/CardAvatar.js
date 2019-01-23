import React, { Component } from "react";
import styled from "styled-components";
import getAvatarURL from "../../Functions/getAvatarURL";

// Component to load profile picture accordingly to the platform
export const Avatar = styled.div`
  background: url(${props => props.url});
  width: 40px;
  height: 40px;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: flex-start;
`;
export default class CardAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ""
    };
  }

  async componentWillMount() {
    const { platform, author } = this.props;
    const URL = await getAvatarURL(platform, author);
    this.setState({
      url: URL
    });
  }
  render() {
    const { url } = this.state;
    return <Avatar url={url} />;
  }
}
