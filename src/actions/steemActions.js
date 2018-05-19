import {
  GET_LOGGED_PROFILE,
  GET_FOLLOWING,
  CHANGE_LOGIN_STATUS,
  GET_PROFILE_VOTES,
  GET_TRENDING_POSTS,
  CHANGE_VOTE_POWER,
  CHANGE,
  GET,
  GET_NEW_POSTS
} from "./types";
import api from "../Api";
import steem from "steem";

export const getUserProfile = () => async dispatch => {
  await api
    .me(function(err, res) {
      if (String(err).includes("sc2")) {
        localStorage.removeItem("token");
        localStorage.removeItem("cToken");
        window.location.reload();
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
    );
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
    );
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
    );
};

export const getSteemTrendingPosts = props => async dispatch => {
  const query = {
    tag: props,
    limit: 50
  };
  let bucket = [];
  await steem.api
    .getDiscussionsByTrendingAsync(query)
    .then(result => {
      bucket.push(result);
      dispatch({
        type: GET_TRENDING_POSTS,
        payload: bucket[0]
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  return bucket[0];
};
export const getSteemNewPosts = props => async dispatch => {
  const query = {
    tag: props,
    limit: 50
  };
  let bucket = [];
  await steem.api
    .getDiscussionsByCreatedAsync(query)
    .then(result => {
      bucket.push(result);
      dispatch({
        type: GET_NEW_POSTS,
        payload: bucket[0]
      });
    })
    .catch(function(error) {
      console.log(error);
    });
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
