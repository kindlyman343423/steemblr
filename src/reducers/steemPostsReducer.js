import {
  GET_TRENDING_POSTS,
  GET_NEW_POSTS,
  GET_FEED_POSTS,
  REMOVE_POSTS_FROM_STATE,
  UPDATE_POST
} from "../actions/types";

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDING_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_NEW_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case REMOVE_POSTS_FROM_STATE:
      return {
        ...state,
        posts: action.payload
      };
    case GET_FEED_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
