import { combineReducers } from 'redux';
import steemReducer from './steemReducer';
import steemFollowingReducer from './steemFollowingReducer'
import steemLoginReducer from './steemLoginReducer'

export default combineReducers({
  steemProfile: steemReducer,
  following: steemFollowingReducer,
  login: steemLoginReducer
});