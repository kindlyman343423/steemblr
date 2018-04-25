import { POST_FOLLOWING_TO_STATE, POST_VOTES_TO_STATE } from "./types";
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
  console.log(newState.concat(state, newItem));
  dispatch({
    type: POST_VOTES_TO_STATE,
    payload: newState.concat(state, newItem)
  });
};
