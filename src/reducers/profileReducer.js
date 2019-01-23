import { PROFILE_GET } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GET:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
