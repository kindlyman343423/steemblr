import { CHANGE_LOGIN_STATUS } from "../actions/types";

const initialState = {
  status: false,
  platform: "",
  username: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
