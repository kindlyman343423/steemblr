import { NEW_POST_MODAL, NEW_POST_FORM } from "./types";

export const newPostModal = props => dispatch => {
  dispatch({
    type: NEW_POST_MODAL,
    payload: props
  });
};
export const newPostForm = props => dispatch => {
  dispatch({
    type: NEW_POST_FORM,
    payload: props
  });
};
