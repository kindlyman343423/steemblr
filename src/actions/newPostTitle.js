import { PUT_NEW_POST_TITLE } from "./types";

const newPostTitle = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_TITLE,
    payload: props
  });
};
export default newPostTitle;
