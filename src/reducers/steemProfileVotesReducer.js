import {
  GET_PROFILE_VOTES,
  POST_VOTES_TO_STATE,
  REMOVE_VOTE_FROM_STATE
} from "../actions/types";

const initialState = {
  votes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_VOTES:
      return {
        ...state,
        votes: action.payload
      };
    case POST_VOTES_TO_STATE:
      return {
        ...state,
        votes: action.payload
      };
    case REMOVE_VOTE_FROM_STATE:
      return {
        ...state,
        votes: action.payload
      };
    default:
      return state;
  }
}
