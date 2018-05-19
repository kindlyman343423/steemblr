import { GET_NEW_POSTS } from "../actions/types";

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
