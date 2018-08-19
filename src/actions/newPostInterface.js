import {
  NEW_POST_MODAL,
  NEW_POST_FORM,
  NEW_POST_IS_ERROR,
  NEW_POST_ERROR_MSG
} from "./types";

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
export const newPostIsError = props => dispatch => {
  dispatch({
    type: NEW_POST_IS_ERROR,
    payload: props
  });
};
export const newPostErrorMsg = props => dispatch => {
  dispatch({
    type: NEW_POST_ERROR_MSG,
    payload: props
  });
};
