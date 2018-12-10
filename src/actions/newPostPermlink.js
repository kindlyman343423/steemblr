import {
  PUT_EXISTING_POST_PERMLINK,
  PUT_EXISTING_POST_PARENT_PERMLINK
} from "./types";

export const existingPostPermlink = props => dispatch => {
  dispatch({
    type: PUT_EXISTING_POST_PERMLINK,
    payload: props
  });
};
export const existingPostParentPermlink = props => dispatch => {
  dispatch({
    type: PUT_EXISTING_POST_PARENT_PERMLINK,
    payload: props
  });
};
