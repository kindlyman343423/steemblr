import {
  POST_FOLLOWING_TO_STATE,
  POST_VOTE_TO_STATE,
  REMOVE_VOTE_FROM_STATE,
  POST_MEDIA,
  CHANGE_POST_TYPE,
  PUT_UUID,
  REMOVE_POSTS_FROM_STATE,
  REMOVE_AUTHOR_POSTS_FROM_STATE,
  CHANGE_LOGIN_STATUS
} from "./types";
import store from ".././store";

export const postFollowingToState = props => dispatch => {
  const newItem = [props];

  const state = store.getState().following.users;
  let newState = [];
  dispatch({
    type: POST_FOLLOWING_TO_STATE,
    payload: newState.concat(state, newItem)
  });
};
export const postVoteToState = props => dispatch => {
  const newItem = [props];

  const state = store.getState().steemProfileVotes.votes;
  let newState = [];
  dispatch({
    type: POST_VOTE_TO_STATE,
    payload: newState.concat(state, newItem)
  });
};
export const removeVoteFromState = props => dispatch => {
  const state = store.getState().steemProfileVotes.votes;
  const newState = state.filter(item => {
    return item.permlink !== props.permlink;
  });
  dispatch({
    type: REMOVE_VOTE_FROM_STATE,
    payload: newState
  });
};
export const putPostMedia = props => dispatch => {
  const state = store.getState().newPost.media;
  const item = [props];
  const newState = state.concat(item);
  dispatch({
    type: POST_MEDIA,
    payload: newState
  });
};
export const putUUIDOfImage = props => dispatch => {
  dispatch({
    type: PUT_UUID,
    payload: props
  });
};
export const changePostType = props => dispatch => {
  dispatch({
    type: CHANGE_POST_TYPE,
    payload: props
  });
};
export const removePostsFromState = props => dispatch => {
  dispatch({
    type: REMOVE_POSTS_FROM_STATE,
    payload: []
  });
};
export const removeAuthorPostsFromState = props => dispatch => {
  dispatch({
    type: REMOVE_AUTHOR_POSTS_FROM_STATE,
    payload: []
  });
};
export const changeLoginStatus = props => dispatch => {
  return dispatch({
    type: CHANGE_LOGIN_STATUS,
    payload: props
  });
};
