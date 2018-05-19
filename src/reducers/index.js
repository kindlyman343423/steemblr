import { combineReducers } from "redux";
import steemReducer from "./steemReducer";
import steemFollowingReducer from "./steemFollowingReducer";
import steemLoginReducer from "./steemLoginReducer";
import steemProfileVotesReducer from "./steemProfileVotesReducer";
import steemPostsReducer from "./steemPostsReducer";
import steemVotePowerReducer from "./steemVotePowerReducer";
import newPostReducer from "./newPostReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  steemProfile: steemReducer,
  steemProfileVotes: steemProfileVotesReducer,
  following: steemFollowingReducer,
  login: steemLoginReducer,
  steemPosts: steemPostsReducer,
  votePower: steemVotePowerReducer,
  newPost: newPostReducer,
  location: locationReducer
});
