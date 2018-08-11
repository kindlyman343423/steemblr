import { PUT_NEW_POST_AUDIO } from "./types";

const newPostAudio = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_AUDIO,
    payload: props
  });
};
export default newPostAudio;
