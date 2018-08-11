import { PUT_NEW_POST_VIDEO } from "./types";

const newPostVideo = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_VIDEO,
    payload: props
  });
};
export default newPostVideo;
