import React, { Component } from "react";

import styled from "styled-components";
import Spinner from ".././Components/Spinner";
import Post from ".././Components/Post/";
import steemVote from ".././Functions/steemVote";
import "./index.css";
//REDUX
import { connect } from "react-redux";
import {
  getUserFollowing,
  getProfileVotes,
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
import api from "../Api";
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
    this.updateVotingState = this.updateVotingState.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
  }
  async updateFollowingState(props) {
    await this.props.postFollowingToState(props);
  }
  async updateVotingState(props, action) {
    if (action === true) {
      this.props.postVoteToState(props);
    } else if (action === false) {
      this.props.removeVoteFromState(props);
    }
  }
  async loadMorePosts() {
    if (
      Object.keys(this.props.steemPosts.posts).length === 0 ||
      this.props.steemPosts.posts === undefined ||
      this.state.fetchingData
    ) {
      return void 0;
    }
    const post = this.props.steemPosts.posts[
      this.props.steemPosts.posts.length - 1
    ];
    const query = {
      tag: this.props.steemProfile.profile._id,
      start_permlink: post.permlink,
      start_author: post.author,
      category: "new"
    };
    await this.setState({
      fetchingData: true,
      posts: this.props.steemPosts.posts
    });
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
  async componentWillMount() {
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
  }
  renderWaypoint() {
    if (this.state.hasMorePosts) {
      return (
        <Waypoint scrollableAncestor={window} onEnter={this.loadMorePosts}>
          <span style={{ color: "transparent" }}>Loading...</span>
        </Waypoint>
      );
    } else {
      return <EndMessage>No more posts to load</EndMessage>;
    }
  }

  async handleVoting(username, author, permlink, votePercent) {
    const login = store.getState().login.status;
    if (login) {
      if (votePercent === 0) {
        await steemVote(
          username,
          author,
          permlink,
          store.getState().votePower.power
        );

        this.updateVotingState(
          {
            permlink: author + "/" + permlink,
            percent: store.getState().votePower.power
          },
          true
        );
      } else if (votePercent > 0) {
        await steemVote(username, author, permlink, 0);

        this.updateVotingState(
          {
            permlink: author + "/" + permlink,
            percent: 0
          },
          false
        );
      }
    } else {
      alert("You have to login first");
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
      let fullPermlink = [post.root_author, post.root_permlink].join("/");
      return (
        <Post
          post={post}
          username={this.props.steemProfile.profile._id}
          isFollowing={this.props.following.users.includes(post.author)}
          key={post.id}
          updateFollowingState={this.updateFollowingState}
          updateVotingState={this.updateVotingState}
          voteStatus={this.checkVoteStatus(fullPermlink)}
          fullPermlink={fullPermlink}
          handleVoting={this.handleVoting}
          homeComponent={true}
          width="100%"
          section="home"
        />
      );
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
  postFollowingToState: state.postFollowingToState
});

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    getUserFollowing,
    getProfileVotes,
    getNewPosts,
    getSteemFeedPosts,
    postFollowingToState,
    removePostsFromState,
    postVoteToState,
    removeVoteFromState
  }
)(PostsLoader);
