import {
  POST_MEDIA,
  PUT_NEW_POST_TYPE,
  PUT_NEW_POST_BODY,
  PUT_UUID,
  PUT_NEW_POST_TAGS,
  PUT_NEW_POST_TITLE,
  PUT_NEW_POST_AUDIO,
  PUT_NEW_POST_VIDEO,
  PUT_NEW_POST_QUOTE,
  PUT_NEW_POST_QUOTE_SOURCE,
  PUT_NEW_POST_PHOTO,
  DEL_NEW_POST_PHOTO,
  DEL_NEW_POST_VIDEO,
  DEL_NEW_POST_AUDIO,
  PUT_EXISTING_POST_PERMLINK,
  PUT_EXISTING_POST_PARENT_PERMLINK,
  PUT_REBLOGGED_POST_BODY
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
  quote: "",
  quoteSource: "",
  photo: "",
  permlink: "",
  parent_permlink: "",
  reblogged_post: {}
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
    case DEL_NEW_POST_AUDIO:
      return {
        ...state,
        audio: action.payload
      };
    case PUT_NEW_POST_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case DEL_NEW_POST_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case PUT_NEW_POST_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
    case PUT_NEW_POST_QUOTE:
      return {
        ...state,
        quote: action.payload
      };
    case PUT_NEW_POST_QUOTE_SOURCE:
      return {
        ...state,
        quoteSource: action.payload
      };
    case PUT_EXISTING_POST_PERMLINK:
      return {
        ...state,
        permlink: action.payload
      };
    case PUT_EXISTING_POST_PARENT_PERMLINK:
      return {
        ...state,
        parent_permlink: action.payload
      };
    case DEL_NEW_POST_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
    case PUT_UUID:
      return {
        ...state,
        imageUUID: action.payload
      };
    case PUT_REBLOGGED_POST_BODY:
      return {
        ...state,
        reblogged_post: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
