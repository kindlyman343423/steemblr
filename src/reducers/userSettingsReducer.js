import { GET_USER_SETTINGS, EDIT_USER_SETTINGS } from "../actions/types";

const initialState = { isNSFWAllowed: false, following: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    case EDIT_USER_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return {
        ...state
      };
    }
  }
}
