import { PUT_NEW_POST_TYPE } from "./types";

const newPostType = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_TYPE,
    payload: props
  });
};
export default newPostType;
