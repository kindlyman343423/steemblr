import { combineReducers } from "redux";
import steemReducer from "./steemReducer";
import steemFollowingReducer from "./steemFollowingReducer";
import steemLoginReducer from "./steemLoginReducer";
import steemProfileVotesReducer from "./steemProfileVotesReducer";
import steemPostsReducer from "./steemPostsReducer";
import steemVotePowerReducer from "./steemVotePowerReducer";
import newPostReducer from "./newPostReducer";
import locationReducer from "./locationReducer";
import steemAccountsReducer from "./steemAccountsReducer";
import steemByAuthorPostsReducer from "./steemByAuthorPostsReducer";
import singlePostReducer from "./singlePostReducer";
export default combineReducers({
  steemProfile: steemReducer,
  steemProfileVotes: steemProfileVotesReducer,
  steemPostsByAuthor: steemByAuthorPostsReducer,
  steemAccounts: steemAccountsReducer,
  following: steemFollowingReducer,
  login: steemLoginReducer,
  steemPosts: steemPostsReducer,
  votePower: steemVotePowerReducer,
  newPost: newPostReducer,
  location: locationReducer,
  singlePost: singlePostReducer
});
