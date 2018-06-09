import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Post from ".././Components/Post/";
import steemVote from ".././Functions/steemVote";
//import getTrendingPosts from '.././Functions/getTrendingPosts'
import Masonry from "react-masonry-css";
import Spinner from ".././Components/Spinner";
import Waypoint from "react-waypoint";

import styled from "styled-components";
//REDUX
import { connect } from "react-redux";
import {
  getUserFollowing,
  getProfileVotes,
  getSteemTrendingPosts,
  getSteemNewPosts
} from ".././actions/steemActions";
import {
  postFollowingToState,
  postVoteToState,
  removeVoteFromState,
  removePostsFromState
} from "../actions/stateActions";

import store from ".././store";
const Container = styled.div`
  box-sizing: border-box;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 6em;
  position: relative;
  @media (max-width: 1024px) {
    margin-top: 7em;
  }
  @media (max-width: 768px) {
    margin-top: 6em;
  }
  @media (max-width: 425px) {
    padding-left: 0;
    padding-right: 0;
    margin-top: 4.5em;
  }
  @media (max-width: 375px) {
  }
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
      shouldLoad: false,
      innerWidth: window.innerWidth,
      tag: this.props.location.search.substring(1),
      hasMorePosts: true
    };

    this.updateVotingState = this.updateVotingState.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
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
      tag: this.props.location.search.substring(1),
      start_permlink: post.permlink,
      start_author: post.author
    };
    await this.setState({
      fetchingData: true,
      posts: this.props.steemPosts.posts
    });
    await this.props.getSteemNewPosts(query);
    await this.setState({
      fetchingData: false
    });
    if (this.state.posts.length === this.props.steemPosts.posts.length) {
      this.setState({
        hasMorePosts: false
      });
    }
  }
  updateDimensions() {
    this.setState({
      innerWidth: window.innerWidth
    });
  }
  async componentWillMount() {
    await this.props.removePostsFromState();
    const query = {
      tag: this.props.location.search.substring(1),
      limit: 10
    };
    window.addEventListener("resize", this.updateDimensions);
    await this.props.getSteemNewPosts(query);

    await this.setState({
      posts: this.props.steemPosts.posts,
      fetchingData: false
    });
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
  renderWaypoint() {
    if (this.state.hasMorePosts) {
      return (
        <Waypoint onEnter={this.loadMorePosts}>
          <span style={{ width: "50px", height: "50px" }}>Loading...</span>
        </Waypoint>
      );
    } else {
      return <EndMessage>No more posts to load</EndMessage>;
    }
  }

  async updateVotingState(props, action) {
    if (action === true) {
      this.props.postVoteToState(props);
    } else if (action === false) {
      this.props.removeVoteFromState(props);
    }
  }
  renderPosts() {
    return this.props.steemPosts.posts.map(post => {
      let width = "%";

      let fullPermlink = [post.root_author, post.root_permlink].join("/");
      return (
        <Post
          post={post}
          username={this.props.steemProfile.profile._id}
          isFollowing={this.props.following.users.includes(post.author)}
          key={post.id}
          updateVotingState={this.updateVotingState}
          voteStatus={this.checkVoteStatus(fullPermlink)}
          fullPermlink={fullPermlink}
          handleVoting={this.handleVoting}
          width={width}
          componentLocation="explore"
        />
      );
    });
  }
  render() {
    const breakpointColumnsObj = {
      default: 3,
      2570: 4,
      1368: 3,
      768: 2,
      425: 1
    };

    return (
      <Container>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {this.renderPosts()}
        </Masonry>
        {this.state.fetchingData ? <Spinner /> : this.renderWaypoint()}
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
    getUserFollowing,
    getProfileVotes,
    getSteemTrendingPosts,
    getSteemNewPosts,
    removePostsFromState,
    postFollowingToState,
    postVoteToState,
    removeVoteFromState
  }
)(hot(module)(PostsLoader));
