import React, { Component } from "react";

import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import uuidv4 from "uuid/v4";
import Spinner from ".././Components/Spinner";
import Post from ".././Components/Post";
import steemVote from ".././Functions/steemVote";
import "./index.css";
//REDUX
import { connect } from "react-redux";
import {
  getUserFollowing,
  getProfileVotes,
  getSteemTrendingPosts
} from ".././actions/steemActions";
import {
  postFollowingToState,
  postVoteToState,
  removeVoteFromState
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
      isLoading: true,
      fetchingData: false,
      posts: [],
      layoutReady: false,
      items: store.getState(),
      shouldLoad: false,
      paginationCounter: 10
    };
    store.subscribe(() => {
      this.setState({
        items: store.getState()
      });
    });
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
    } else {
      const post = this.props.steemPosts.posts[
        this.props.steemPosts.posts.length - 1
      ];
      const query = {
        tag: "life",
        start_permlink: post.permlink,
        start_author: post.author
      };
      await this.setState({ fetchingData: true });
      await this.props.getSteemTrendingPosts(query);
      await this.setState({
        fetchingData: true,
        paginationCounter: this.state.paginationCounter + 50
      });
      await this.setState({ fetchingData: false });
    }
  }
  async componentWillMount() {
    await this.props.getSteemTrendingPosts("life");
    await this.setState({
      paginationCounter: 50,
      items: await store.getState(),
      posts: await this.props.steemPosts.posts
    });
  }
  renderWaypoint() {
    console.log("Hitting waypoints");
    console.log(this.state.fetchingData);
    if (!this.state.fetchingData) {
      return (
        <Waypoint
          threshold={0.5}
          scrollableAncestor={window}
          onEnter={this.loadMorePosts}
        >
          <div style={{ color: "#FFF" }}>LOADING...</div>
        </Waypoint>
      );
    }
  }
  componentWillReceiveProps() {
    setTimeout(
      this.setState({
        isLoading: false
      }),
      2000
    );
  }
  async handleVoting(username, author, permlink, votePercent) {
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
  }
  checkVoteStatus(props) {
    const find = this.state.items.steemProfileVotes.votes.find(
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
  render() {
    return (
      <Container>
        {this.props.steemPosts.posts
          .slice(0, this.state.paginationCounter)
          .map(post => {
            let fullPermlink = [post.root_author, post.root_permlink].join("/");
            return (
              <Post
                post={post}
                username={this.state.items.steemProfile.profile._id}
                isFollowing={this.state.items.following.users.includes(
                  post.author
                )}
                key={uuidv4()}
                updateFollowingState={this.updateFollowingState}
                updateVotingState={this.updateVotingState}
                voteStatus={this.checkVoteStatus(fullPermlink)}
                fullPermlink={fullPermlink}
                handleVoting={this.handleVoting}
                homeComponent={true}
                width="100%"
              />
            );
          })}
        {this.renderWaypoint()}
        {this.state.fetchingData ? <Spinner /> : void 0}
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

export default connect(mapStateToProps, {
  getUserFollowing,
  getProfileVotes,
  getSteemTrendingPosts,
  postFollowingToState,
  postVoteToState,
  removeVoteFromState
})(PostsLoader);
