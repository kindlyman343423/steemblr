import {
  POST_FOLLOWING_TO_STATE,
  POST_VOTES_TO_STATE,
  REMOVE_VOTE_FROM_STATE
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
export const postVotesToState = props => dispatch => {
  const newItem = [props];

  const state = store.getState().steemProfileVotes.votes;
  let newState = [];
  dispatch({
    type: POST_VOTES_TO_STATE,
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
