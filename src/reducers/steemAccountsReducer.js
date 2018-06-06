import { GET_ACCOUNT } from "../actions/types";
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
    default:
      return {
        ...state
      };
  }
}
