import {
  POST_MEDIA,
  PUT_NEW_POST_TYPE,
  PUT_NEW_POST_BODY,
  PUT_UUID,
  PUT_NEW_POST_TAGS,
  PUT_NEW_POST_TITLE,
  NEW_POST_MODAL,
  NEW_POST_FORM,
  PUT_NEW_POST_AUDIO,
  PUT_NEW_POST_VIDEO
} from "../actions/types";

const initialState = {
  type: "",
  media: [],
  imageUUID: "",
  title: "",
  tags: [],
  body: "",
  audio: "",
  video: "",
  modal: false,
  isForm: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_MEDIA:
      return {
        ...state,
        media: action.payload
      };
    case PUT_NEW_POST_TYPE:
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
    case PUT_NEW_POST_AUDIO:
      return {
        ...state,
        audio: action.payload
      };
    case PUT_NEW_POST_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case NEW_POST_MODAL:
      return {
        ...state,
        modal: action.payload
      };
    case NEW_POST_FORM:
      return {
        ...state,
        isForm: action.payload
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
