import {
  GET_POSTS_BY_AUTHOR,
  REMOVE_AUTHOR_POSTS_FROM_STATE
} from "../actions/types";

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_BY_AUTHOR:
      return {
        ...state,
        posts: action.payload
      };
    case REMOVE_AUTHOR_POSTS_FROM_STATE:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
