import { POST_MEDIA, CHANGE_POST_TYPE, PUT_UUID } from "../actions/types";

const initialState = {
  type: "",
  media: [],
  imageUUID: ""
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
    case PUT_UUID:
      return {
        ...state,
        imageUUID: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
