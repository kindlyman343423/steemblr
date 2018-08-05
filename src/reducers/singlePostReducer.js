import { GET_SINGLE_POST } from "../actions/types";

const initialState = { post: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_POST:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
}
