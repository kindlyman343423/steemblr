import { GET_ACCOUNT, EDIT_THEME } from "../actions/types";
const initialState = {
  accounts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNT:
      return {
        ...state,
        accounts: action.payload
      };
    case EDIT_THEME:
      return {
        ...state,
        accounts: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
