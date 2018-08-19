import { PUT_NEW_POST_TAGS } from "./types";

const newPostTags = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_TAGS,
    payload: props
  });
};
export default newPostTags;
