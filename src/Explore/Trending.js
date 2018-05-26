import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Post from ".././Components/Post";
import steemVote from ".././Functions/steemVote";
//import getTrendingPosts from '.././Functions/getTrendingPosts'
import { SpringGrid } from "react-stonecutter";
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
  margin: window.innerWidth >= 768 ? "0 auto" : 0,
  marginLeft:
    window.innerWidth <= 425 ? "15px" : window.innerWidth <= 375 ? "2px" : 0
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  margin-top: 7em;
  @media (max-width: 1024px) {
    margin-top: 7em;
  }
  @media (max-width: 768px) {
    margin-top: 7em;
  }
  @media (max-width: 425px) {
    margin-top: 6em;
  }
  @media (max-width: 375px) {
  }
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
      paginationCounter: 10,
      innerWidth: window.innerWidth
    };

    this.updateVotingState = this.updateVotingState.bind(this);
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    store.subscribe(() => {
      this.setState({
        items: store.getState()
      });
    });
    console.log(window.innerWidth);
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
  updateDimensions() {
    this.setState({
      innerWidth: window.innerWidth
    });
  }
  async componentWillMount() {
    window.addEventListener("resize", this.updateDimensions);
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
      gutter: this.state.innerWidth > 768 ? 20 : 10,
      transitionDuration: 0,
      visibility: this.state.layoutReady ? "visible" : "hidden"
    };
    if (this.state.isLoading)
      return (
        <MuiThemeProvider>
          <Spinner marginTop="20" />
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
          className="scroll"
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
                let width = "";
                if (this.state.innerWidth > 768) {
                  width = "25vw";
                } else {
                  width = "45vw";
                }

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
                    updateVotingState={this.updateVotingState}
                    voteStatus={this.checkVoteStatus(fullPermlink)}
                    fullPermlink={fullPermlink}
                    handleVoting={this.handleVoting}
                    width={width}
                    componentLocation="explore"
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
})(hot(module)(Trending));
