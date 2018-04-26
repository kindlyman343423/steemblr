import { CHANGE_VOTE_POWER } from "../actions/types";

const initialState = {
  power: 10000
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VOTE_POWER:
      return {
        ...state,
        power: action.payload
      };
    default:
      return state;
  }
}
