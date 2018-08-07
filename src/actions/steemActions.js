import {
  GET_LOGGED_PROFILE,
  GET_FOLLOWING,
  CHANGE_LOGIN_STATUS,
  GET_PROFILE_VOTES,
  GET_TRENDING_POSTS,
  CHANGE_VOTE_POWER,
  CHANGE,
  GET_NEW_POSTS,
  GET_FEED_POSTS
} from "./types";
import api from "../Api";
import steem from "steem";
import store from "../store";
export const getUserProfile = () => async dispatch => {
  await api
    .me(function(err, res) {
      if (String(err).includes("sc2")) {
        localStorage.removeItem("token");
        localStorage.removeItem("cToken");
      }
      if (err !== null) {
        console.log();
        return err;
      } else {
        return res;
      }
    })
    .then(res =>
      dispatch({
        type: GET_LOGGED_PROFILE,
        payload: res
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const getUserFollowing = props => async dispatch => {
  let bucket = [];
  await steem.api
    .getFollowingAsync(props, 0, "blog", 1000)
    .then(result => {
      result.map(item => {
        bucket.push(item.following);
      });
      return result;
    })
    .then(res =>
      dispatch({
        type: GET_FOLLOWING,
        payload: bucket
      })
    )
    .catch(error => {
      console.log(error);
    });
};
export const changeLoginStatus = action => dispatch => {
  return dispatch({
    type: CHANGE_LOGIN_STATUS,
    payload: action
  });
};

export const getProfileVotes = props => async dispatch => {
  let bucket = [];
  await steem.api
    .getAccountVotesAsync(props)
    .then(result => {
      result.map(vote => {
        bucket.push({
          permlink: vote.authorperm,
          percent: vote.percent
        });
      });
    })
    .then(res =>
      dispatch({
        type: GET_PROFILE_VOTES,
        payload: bucket
      })
    )
    .catch(error => {
      console.log(error);
    });
};

export const getSteemTrendingPosts = props => async dispatch => {
  const query = {
    tag: props.tag,
    limit: 10,
    start_permlink: props.start_permlink,
    start_author: props.start_author
  };
  const simpleQuery = {
    tag: props.tag,
    limit: 10
  };
  const oldState = store.getState().steemPosts.posts;
  let bucket = [];
  await steem.api
    .getDiscussionsByTrendingAsync(
      query.start_permlink === undefined ? simpleQuery : query
    )
    .then(result => {
      bucket.push(result);
      dispatch({
        type: GET_TRENDING_POSTS,
        payload: oldState.concat(
          query.start_permlink === undefined ? bucket[0] : bucket[0].splice(1)
        )
      });
      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });
  return bucket[0];
};
export const getSteemNewPosts = props => async dispatch => {
  const query = {
    tag: props.tag,
    limit: 10,
    start_permlink: props.start_permlink,
    start_author: props.start_author
  };
  const simpleQuery = {
    tag: props.tag,
    limit: 10
  };
  const oldState = store.getState().steemPosts.posts;
  let bucket = [];
  await steem.api
    .getDiscussionsByCreatedAsync(
      query.start_permlink === undefined ? simpleQuery : query
    )
    .then(result => {
      bucket.push(result);
      dispatch({
        type: GET_NEW_POSTS,
        payload: oldState.concat(
          query.start_permlink === undefined ? bucket[0] : bucket[0].splice(1)
        )
      });
      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });
  return bucket[0];
};
export const getSteemFeedPosts = props => async dispatch => {
  let query = {
    tag: props.tag,
    limit: 10,
    start_permlink: props.start_permlink,
    start_author: props.start_author
  };
  let simpleQuery = {
    tag: props.tag,
    limit: 10
  };
  if (props.tag === undefined) {
    await api.me();
    simpleQuery = {
      tag: store.getState().steemProfile.profile._id,
      limit: 10,
      start_permlink: props.start_permlink,
      start_author: props.start_author
    };
  }

  const oldState = store.getState().steemPosts.posts;
  let bucket = [];
  await steem.api
    .getDiscussionsByFeedAsync(
      query.start_permlink === undefined ? simpleQuery : query
    )
    .then(result => {
      bucket.push(result);
      dispatch({
        type: GET_FEED_POSTS,
        payload: oldState.concat(
          query.start_permlink === undefined ? bucket[0] : bucket[0].splice(1)
        )
      });
      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });
  return bucket[0];
};
export const getSteemHotPosts = props => async dispatch => {
  const query = {
    tag: props.tag,
    start_permlink: props.start_permlink,
    start_author: props.start_author,
    limit: 10
  };
  const simpleQuery = {
    tag: props.tag,
    limit: 10
  };
  const oldState = store.getState().steemPosts.posts;
  let bucket = [];
  await steem.api
    .getDiscussionsByHotAsync(
      query.start_permlink === undefined ? simpleQuery : query
    )
    .then(result => {
      bucket.push(result);
      dispatch({
        type: GET_NEW_POSTS,
        payload: oldState.concat(
          query.start_permlink === undefined ? bucket[0] : bucket[0].splice(1)
        )
      });
      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });
  return bucket[0];
};
export const changeVotePower = props => async dispatch => {
  dispatch({
    type: CHANGE_VOTE_POWER,
    payload: props
  });
};
export const changeLocation = props => async dispatch => {
  dispatch({
    type: CHANGE,
    payload: props
  });
};
