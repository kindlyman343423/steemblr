import { PUT_NEW_POST_PHOTO, DEL_NEW_POST_PHOTO } from "./types";

export const newPostPhoto = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_PHOTO,
    payload: props
  });
};
export const newPostPhotoDel = props => dispatch => {
  dispatch({
    type: DEL_NEW_POST_PHOTO,
    payload: ""
  });
};
