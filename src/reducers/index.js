import { combineReducers } from "redux";
import steemReducer from "./steemReducer";
import steemFollowingReducer from "./steemFollowingReducer";
import loginReducer from "./loginReducer";
import steemProfileVotesReducer from "./steemProfileVotesReducer";
import steemPostsReducer from "./steemPostsReducer";
import steemVotePowerReducer from "./steemVotePowerReducer";
import newPostReducer from "./newPostReducer";
import newPostInterface from "./newPostInterface";
import locationReducer from "./locationReducer";
import steemAccountsReducer from "./steemAccountsReducer";
import steemByAuthorPostsReducer from "./steemByAuthorPostsReducer";
import singlePostReducer from "./singlePostReducer";
import userSettingsReducer from "./userSettingsReducer";
export default combineReducers({
  steemProfile: steemReducer,
  steemProfileVotes: steemProfileVotesReducer,
  steemPostsByAuthor: steemByAuthorPostsReducer,
  steemAccounts: steemAccountsReducer,
  following: steemFollowingReducer,
  login: loginReducer,
  steemPosts: steemPostsReducer,
  votePower: steemVotePowerReducer,
  newPost: newPostReducer,
  newPostInterface: newPostInterface,
  location: locationReducer,
  singlePost: singlePostReducer,
  userSettings: userSettingsReducer
});
