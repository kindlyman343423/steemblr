import React, { Component } from "react";

import Post from ".././Components/Post";
import steemVote from ".././Functions/steemVote";
//import getTrendingPosts from '.././Functions/getTrendingPosts'

import Spinner from ".././Components/Spinner";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroller";

import styled from "styled-components";
import uuidv4 from "uuid/v4";
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

import store from ".././store";

const styles = {
  margin: "0 auto"
};
const Container = styled.div`
  margin-top: 8em;
`;

class Trending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: [],
      layoutReady: false,
      items: store.getState(),
      shouldLoad: false,
      paginationCounter: 10
    };

    this.updateFollowingState = this.updateFollowingState.bind(this);
    this.updateVotingState = this.updateVotingState.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
    store.subscribe(() => {
      this.setState({
        items: store.getState()
      });
    });
  }
  async loadMorePosts() {
    if (
      Object.keys(this.state.items.steemPosts.posts).length === 0 ||
      this.state.items.steemPosts.posts === undefined
    ) {
    } else {
      this.setState({
        posts: this.props.steemPosts.posts.slice(
          0,
          this.state.paginationCounter
        ),
        paginationCounter:
          this.state.isLoading === true
            ? this.state.paginationCounter
            : this.state.paginationCounter + 10
      });
    }
  }
  async componentWillMount() {
    await this.props.getSteemTrendingPosts("test");
    await this.setState({
      paginationCounter: 10,
      items: await store.getState(),
      posts: await this.props.steemPosts.posts
    });
  }

  componentWillReceiveProps() {
    setTimeout(
      this.setState({
        shouldLoad: false,
        isLoading: false
      }),
      2000
    );
  }
  handleLayoutReady() {
    if (!this.state.layoutReady) {
      this.setState({
        layoutReady: true
      });
    }
  }
  async handleVoting(username, author, permlink, votePercent) {
    if (votePercent === 0) {
      await steemVote(username, author, permlink, this.props.votePower.power);

      this.updateVotingState(
        {
          permlink: author + "/" + permlink,
          percent: this.props.votePower.power
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
    console.log(username, author, permlink, votePercent);
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

  //UPDATING REDUX STORE
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
  render() {
    const masonryOptions = {
      padding: 0,
      fitWidth: true,
      gutter: 20,
      transitionDuration: 0,
      visibility: this.state.layoutReady ? "visible" : "hidden"
    };
    if (this.state.isLoading)
      return (
        <MuiThemeProvider>
          <Spinner marginTop="10" />
        </MuiThemeProvider>
      );
    return (
      <Container>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMorePosts}
          initialLoad={this.state.shouldLoad}
          hasMore={true}
          loader={
            <MuiThemeProvider key={Math.random()}>
              <Spinner key={uuidv4()} />
            </MuiThemeProvider>
          }
        >
          <Masonry
            style={styles}
            options={masonryOptions}
            threshold={250}
            onLayoutComplete={this.handleLayoutReady.bind(this)}
          >
            {this.state.posts
              .slice(0, this.state.paginationCounter)
              .map(post => {
                let fullPermlink = [post.root_author, post.root_permlink].join(
                  "/"
                );
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
                  />
                );
              })}
          </Masonry>
        </InfiniteScroll>
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
  votePower: state.votePower
});

export default connect(mapStateToProps, {
  getUserFollowing,
  getProfileVotes,
  getSteemTrendingPosts,
  postFollowingToState,
  postVoteToState,
  removeVoteFromState
})(Trending);
