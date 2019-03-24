import { PUT_NEW_POST_TAGS, PUT_NEW_POST_NSFW_STATUS } from "./types";

const newPostTags = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_TAGS,
    payload: props
  });
};
export default newPostTags;
export const newPostIsNSFW = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_NSFW_STATUS,
    payload: props
  });
};
