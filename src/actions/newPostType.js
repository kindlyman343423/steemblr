import { CHANGE_NEW_POST_TYPE } from "./types";

const newPostType = props => dispatch => {
  dispatch({
    type: CHANGE_NEW_POST_TYPE,
    payload: props
  });
};
export default newPostType;
