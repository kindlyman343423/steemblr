import React, { Component } from "react";

import styled from "styled-components";
import Spinner from ".././Components/Spinner";
import Post from "./Post/";
//REDUX
import { connect } from "react-redux";
import { getUserFollowing } from ".././actions/steemActions";
import { getPostsByAuthor } from "../actions/getPostsByAuthor";
import getSinglePost from "../actions/getSinglePost";
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
const BlogContainer = styled.div`
  width: 45vw;
  @media (max-width: 1024px) {
    width: 60vw;
  }
  @media (max-width: 425px) {
    width: 90vw;
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
      hasMorePosts: true,
      posts: []
    };

    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.updateFollowingState = this.updateFollowingState.bind(this);
    this.updateVotingState = this.updateVotingState.bind(this);
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
      beforeDate: post.cashout_time,
      initial: false,
      timestamp: post.timestamp
    };

    await this.setState({
      fetchingData: true,
      posts: this.props.steemPostsByAuthor.posts
    });
    await this.props.getPostsByAuthor(query);
    await this.setState({
      fetchingData: false
    });

    if (
      this.state.posts.length === this.props.steemPostsByAuthor.posts.length
    ) {
      this.setState({
        hasMorePosts: false
      });
    }
  }
  async componentWillMount() {
    if (
      this.props.match !== undefined &&
      this.props.match.params.permlink !== undefined
    ) {
      this.props.getSinglePost(this.props.match.params.permlink);
      await this.setState({
        fetchingData: false
      });
    } else {
      await this.props.removeAuthorPostsFromState();

      await this.props.getPostsByAuthor(this.props.query);

      await this.setState({
        posts: this.props.steemPostsByAuthor.posts,
        fetchingData: false
      });
    }
  }
  renderWaypoint() {
    if (
      this.props.match !== undefined &&
      this.props.match.params.permlink !== undefined
    ) {
      return "";
    } else if (this.state.hasMorePosts) {
      return (
        <Waypoint onEnter={this.loadMorePosts}>
          <span style={{ width: "50px", height: "50px" }}>Loading...</span>
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
    if (
      this.props.match !== undefined &&
      this.props.match.params.permlink !== undefined
    ) {
      return this.props.singlePost.post.map(post => {
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
            homeComponent={true}
            width="100%"
          />
        );
      });
    } else {
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
            homeComponent={true}
            width="100%"
          />
        );
      });
    }
  }
  render() {
    if (this.props.componentLocation === "blog") {
      return (
        <BlogContainer>
          {this.renderPosts()}
          {this.state.fetchingData ? (
            <Spinner margin="5" />
          ) : (
            this.renderWaypoint()
          )}
        </BlogContainer>
      );
    }
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
  postFollowingToState: state.postFollowingToState,
  singlePost: state.singlePost
});

export default connect(
  mapStateToProps,
  {
    getUserFollowing,
    getPostsByAuthor,
    postFollowingToState,
    removeAuthorPostsFromState,
    postVoteToState,
    removeVoteFromState,
    getSinglePost
  }
)(PostsLoader);
