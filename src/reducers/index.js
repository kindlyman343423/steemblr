import { combineReducers } from 'redux';
import steemReducer from './steemReducer';
import steemFollowingReducer from './steemFollowingReducer'

export default combineReducers({
  steemProfile: steemReducer,
  following: steemFollowingReducer,
});