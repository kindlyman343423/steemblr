import {
  POST_MEDIA,
  CHANGE_NEW_POST_TYPE,
  PUT_NEW_POST_BODY,
  PUT_UUID,
  PUT_NEW_POST_TAGS,
  PUT_NEW_POST_TITLE
} from "../actions/types";

const initialState = {
  type: "",
  media: [],
  imageUUID: "",
  title: "",
  tags: [],
  body: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_MEDIA:
      return {
        ...state,
        media: action.payload
      };
    case CHANGE_NEW_POST_TYPE:
      return {
        ...state,
        type: action.payload
      };
    case PUT_NEW_POST_BODY:
      return {
        ...state,
        body: action.payload
      };
    case PUT_NEW_POST_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case PUT_NEW_POST_TITLE:
      return {
        ...state,
        title: action.payload
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
