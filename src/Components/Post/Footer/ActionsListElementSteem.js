import React, { Component } from "react";
import styled from "styled-components";
import getAvatarURL from "Functions/getAvatarURL";
const Avatar = styled.div`
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
`;
const Li = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    padding: 0px 0px 0px 10px;
    b {
      font-weight: 500;
    }
  }
`;
export default class ActionsListElementSteem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: ""
    };
  }
  async componentDidMount() {
    const { data } = this.props;
    const avatarURL = await getAvatarURL(data.platform, data.username);
    this.setState({
      URL: avatarURL
    });
  }
  renderAction = () => {
    const { data } = this.props;
    console.log(data);
    switch (data.action) {
      case "upvote":
        return (
          <Li>
            <Avatar url={this.state.URL} />
            <span>
              <p>
                <b>{data.username}</b>
              </p>
              <p>Upvoted</p>
            </span>
          </Li>
        );
      default:
        return "";
    }
  };
  render() {
    return this.renderAction();
  }
}
