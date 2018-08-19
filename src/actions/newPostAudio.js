import { PUT_NEW_POST_AUDIO, DEL_NEW_POST_AUDIO } from "./types";

export const newPostAudio = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_AUDIO,
    payload: props
  });
};
export const newPostAudioDel = props => dispatch => {
  dispatch({
    type: DEL_NEW_POST_AUDIO,
    payload: ""
  });
};
