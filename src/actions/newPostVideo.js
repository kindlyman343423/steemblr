import { PUT_NEW_POST_VIDEO, DEL_NEW_POST_VIDEO } from "./types";

export const newPostVideo = props => dispatch => {
  dispatch({
    type: PUT_NEW_POST_VIDEO,
    payload: props
  });
};

export const newPostVideoDel = props => dispatch => {
  dispatch({
    type: DEL_NEW_POST_VIDEO,
    payload: ""
  });
};
