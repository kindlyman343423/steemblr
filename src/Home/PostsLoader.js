import React, { Component } from "react";

import styled from "styled-components";
import Spinner from ".././Components/Spinner";
import Post from ".././Components/Post/";
import steemVote from ".././Functions/Steem/steemVote";
import "./index.css";
//REDUX
import { connect } from "react-redux";
import {
  getUserFollowing,
  getSteemFeedPosts,
  getUserProfile
} from ".././actions/steemActions";
import {
  postFollowingToState,
  postVoteToState,
  removeVoteFromState,
  removePostsFromState
} from "../actions/stateActions";
import getNewPosts from ".././actions/getNewPosts";
import Waypoint from "react-waypoint";
import store from ".././store";
const Container = styled.div`
  margin-top: 25px;
`;
const EndMessage = styled.div`
  text-align: center;
`;
class PostsLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      posts: [],
      hasMorePosts: true
    };

    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.updateFollowingState = this.updateFollowingState.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
  }
  async updateFollowingState(props) {
    await this.props.postFollowingToState(props);
  }

  async loadMorePosts() {
    if (
      Object.keys(this.props.steemPosts.posts).length === 0 ||
      this.props.steemPosts.posts === undefined ||
      this.state.fetchingData === true
    ) {
      return void 0;
    } else if (this.state.fetchingData === false) {
      this.setState({
        fetchingData: true,
        posts: this.props.steemPosts.posts
      });
      const post = this.props.steemPosts.posts[
        this.props.steemPosts.posts.length - 1
      ];
      const query = {
        tag: "",
        start_permlink: post.permlink,
        timestamp: post.timestamp,
        start_author: post.author,
        category: "new"
      };
      await this.props.getNewPosts(query);

      await this.setState({
        fetchingData: false
      });
      if (this.state.posts.length === this.props.steemPosts.posts.length) {
        this.setState({
          hasMorePosts: false
        });
      }
    }
  }
  async componentWillMount() {
    const platform = this.props.login.platform;
    if (platform === "steem") {
      await this.props.removePostsFromState();
      const username = await this.props.steemProfile.profile._id;
      if (username === undefined) {
        await this.props.getUserProfile();
      }
      const query = {
        tag: this.props.steemProfile.profile._id,
        category: "new"
      };
      await this.props.getNewPosts(query);

      await this.setState({
        posts: this.props.steemPosts.posts,
        fetchingData: false
      });
    } else if (platform === "email") {
      await this.props.removePostsFromState();
      const query = {
        tag: this.props.profile.displayName,
        category: "new"
      };
      await this.setState({
        posts: this.props.steemPosts.posts,
        fetchingData: false
      });
      await this.props.getNewPosts(query);
    }
  }
  renderWaypoint() {
    if (this.state.hasMorePosts) {
      return (
        <Waypoint
          scrollableAncestor={window}
          onEnter={this.loadMorePosts}
          bottomOffset="-777px"
        >
          <span style={{ color: "transparent" }}>Loading...</span>
        </Waypoint>
      );
    } else {
      return <EndMessage>No more posts to load</EndMessage>;
    }
  }
  checkVoteStatus(props) {
    const find = this.props.steemProfileVotes.votes.find(
      o => o.permlink === props
    );
    if (find) {
      return {
        status: true,
        percent: find.percent
      };
    } else {
      return {
        status: false,
        percent: 0
      };
    }
  }
  renderPosts() {
    return this.props.steemPosts.posts.map(post => {
      const { login } = this.props;
      if (post.platform === "email") {
        let fullPermlink = [post.author, post.root_permlink].join("/");
        return (
          <Post
            post={post}
            username={login.username}
            isFollowing={this.props.following.users.includes(post.author)}
            key={post.id}
            updateFollowingState={this.updateFollowingState}
            voteStatus={this.checkVoteStatus(fullPermlink)}
            fullPermlink={fullPermlink}
            homeComponent={true}
            width="100%"
            section="home"
          />
        );
      } else {
        let fullPermlink = [post.author, post.root_permlink].join("/");
        return (
          <Post
            post={post}
            username={login.username}
            isFollowing={this.props.following.users.includes(post.author)}
            key={post.id}
            updateFollowingState={this.updateFollowingState}
            voteStatus={this.checkVoteStatus(fullPermlink)}
            fullPermlink={fullPermlink}
            homeComponent={true}
            width="100%"
            section="home"
          />
        );
      }
    });
  }
  render() {
    return (
      <Container>
        {this.renderPosts()}
        {this.state.fetchingData ? (
          <Spinner margin="5" />
        ) : (
          this.renderWaypoint()
        )}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  steemProfile: state.steemProfile,
  following: state.following,
  steemProfileVotes: state.steemProfileVotes,
  steemPosts: state.steemPosts,
  postFollowingToState: state.postFollowingToState,
  login: state.login,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    getUserFollowing,
    getNewPosts,
    getSteemFeedPosts,
    postFollowingToState,
    removePostsFromState,
    postVoteToState,
    removeVoteFromState
  }
)(PostsLoader);
