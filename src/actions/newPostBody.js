import { PUT_NEW_POST_BODY, PUT_REBLOGGED_POST_BODY } from "./types";

const newPostBody = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_BODY,
    payload: props
  });
};
export default newPostBody;

export const putRebloggedPost = props => dispatch => {
  dispatch({
    type: PUT_REBLOGGED_POST_BODY,
    payload: props
  });
};
