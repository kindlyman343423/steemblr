import { combineReducers } from "redux";
import steemReducer from "./steemReducer";
import steemFollowingReducer from "./steemFollowingReducer";
import steemLoginReducer from "./steemLoginReducer";
import steemProfileVotesReducer from "./steemProfileVotesReducer";
import steemTrendingPostsReducer from "./steemTrendingPostsReducer";

export default combineReducers({
  steemProfile: steemReducer,
  steemProfileVotes: steemProfileVotesReducer,
  following: steemFollowingReducer,
  login: steemLoginReducer,
  trendingPosts: steemTrendingPostsReducer
});
