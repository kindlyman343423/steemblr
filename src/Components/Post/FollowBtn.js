import styled from "styled-components";
import React, { Component } from "react";
import store from "../../store";
import follow from "Functions/Firebase/follow";
import getFollowing from "actions/getFollowing";
import { connect } from "react-redux";
const Button = styled.button`
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  top: 25%;
  right: 0;
  background: transparent;
  border: 0;
  outline: 0;
  font-weight: 300;
  margin-right: 10px;
  &:active {
    background-color: rgba(200, 200, 200, 0.5);
  }
  @media (max-width: 425px) {
  }
`;
class FollowBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFollowing: false
    };
  }
  componentDidMount() {
    const username = store.getState().login.username;
    this.setState({
      username: username
    });
    this.checkFollowing();
  }
  componentDidUpdate(prevProps) {
    const { following } = this.props;
    if (following !== prevProps.following) {
      this.checkFollowing();
    }
  }
  checkFollowing = () => {
    const { author, following } = this.props;
    const find = following.users.find(obj => obj.username === author);
    if (find) {
      this.setState({ isFollowing: true });
    } else {
      this.setState({
        isFollowing: false
      });
    }
  };
  handleButton = async () => {
    const login = store.getState().login.status;
    if (login) {
      const { author, platform, following } = this.props;
      const { isFollowing } = this.state;
      if (following.users.length === 100 && isFollowing === false) {
        return alert("You can't follow more than 100 people.");
      }
      await follow({
        usernameToFollow: author,
        platform: platform,
        action: isFollowing ? "unfollow" : "follow"
      });
      await store.dispatch(getFollowing());
      this.checkFollowing();
    } else {
      alert("You have to login first");
    }
  };
  render() {
    const { isFollowing, username } = this.state;
    const { author } = this.props;
    if (username === author) {
      return <span />;
    }
    return (
      <Button onClick={this.handleButton}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  following: state.following
});

export default connect(mapStateToProps, {})(FollowBtn);
