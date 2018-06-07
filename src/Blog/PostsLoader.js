import React, { Component } from "react";

import styled from "styled-components";
import Spinner from ".././Components/Spinner";
import Post from "./Post";
import steemVote from ".././Functions/steemVote";
//REDUX
import { connect } from "react-redux";
import {
  getUserFollowing,
  getProfileVotes,
  getPostsByAuthor
} from ".././actions/steemActions";
import {
  postFollowingToState,
  postVoteToState,
  removeVoteFromState,
  removeAuthorPostsFromState
} from "../actions/stateActions";
import Waypoint from "react-waypoint";
import store from ".././store";
const Container = styled.div`
  margin-top: 25px;
`;
class PostsLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingData: true,
      posts: []
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
    console.log("LoadMorePosts");
    if (
      Object.keys(this.props.steemPostsByAuthor.posts).length === 0 ||
      this.props.steemPostsByAuthor.posts === undefined ||
      this.state.fetchingData
    ) {
      return void 0;
    }
    const post = this.props.steemPostsByAuthor.posts[
      this.props.steemPostsByAuthor.posts.length - 1
    ];
    const query = {
      author: post.author,
      startPermlink: post.permlink,
      beforeDate: post.active,
      initial: false
    };
    console.log(query);
    await this.setState({
      fetchingData: true
    });
    await this.props.getPostsByAuthor(query);
    await this.setState({
      fetchingData: false
    });
  }
  async componentWillMount() {
    await this.props.removeAuthorPostsFromState();

    await this.props.getPostsByAuthor(this.props.query);

    await this.setState({
      posts: this.props.steemPostsByAuthor.posts,
      fetchingData: false
    });
  }
  renderWaypoint() {
    return (
      <Waypoint onEnter={this.loadMorePosts}>
        <span style={{ width: "50px", height: "50px" }}>Loading...</span>
      </Waypoint>
    );
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
    return this.props.steemPostsByAuthor.posts.map(post => {
      let fullPermlink = [post.root_author, post.root_permlink].join("/");

      return (
        <Post
          post={post}
          username={this.props.steemProfile.profile._id}
          key={post.id}
          isFollowing={this.props.following.users.includes(post.author)}
          updateFollowingState={this.updateFollowingState}
          updateVotingState={this.updateVotingState}
          voteStatus={this.checkVoteStatus(fullPermlink)}
          fullPermlink={fullPermlink}
          handleVoting={this.handleVoting}
          homeComponent={true}
          width="100%"
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
  steemPostsByAuthor: state.steemPostsByAuthor,
  postFollowingToState: state.postFollowingToState
});

export default connect(
  mapStateToProps,
  {
    getUserFollowing,
    getProfileVotes,
    getPostsByAuthor,
    postFollowingToState,
    removeAuthorPostsFromState,
    postVoteToState,
    removeVoteFromState
  }
)(PostsLoader);
