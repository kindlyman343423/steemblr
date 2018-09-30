import { PUT_EXISTING_POST_PERMLINK } from "./types";

export const existingPostPermlink = props => dispatch => {
  dispatch({
    type: PUT_EXISTING_POST_PERMLINK,
    payload: props
  });
};
