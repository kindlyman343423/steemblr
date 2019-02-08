import React, { Component } from "react";
import styled from "styled-components";
import getAvatarURL from "../Functions/getAvatarURL";

// Component to load profile picture accordingly to the platform
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
export default class BlogAvatar extends Component {
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
  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.setState({
        url: this.props.url
      });
    }
  }
  render() {
    const { url } = this.state;
    const { avatarShape } = this.props;
    return <Avatar url={url} avatarShape={avatarShape} />;
  }
}
