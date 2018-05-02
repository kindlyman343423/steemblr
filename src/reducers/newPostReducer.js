import { POST_MEDIA, CHANGE_POST_TYPE } from "../actions/types";

const initialState = {
  type: "",
  media: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_MEDIA:
      return {
        ...state,
        media: action.payload
      };
    case CHANGE_POST_TYPE:
      return {
        ...state,
        type: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
