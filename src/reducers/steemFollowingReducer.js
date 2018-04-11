import { GET_FOLLOWING } from '../actions/types';

const initialState = {
  users: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FOLLOWING:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}