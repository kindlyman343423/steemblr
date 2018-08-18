import { PUT_NEW_POST_PHOTO } from "./types";

const newPostTags = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_PHOTO,
    payload: props
  });
};
export default newPostTags;
