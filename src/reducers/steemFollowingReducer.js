import { GET_FOLLOWING, POST_FOLLOWING_TO_STATE } from "../actions/types";

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWING:
      return {
        ...state,
        users: action.payload
      };
    case POST_FOLLOWING_TO_STATE:
      return {
        ...state,
        users: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
