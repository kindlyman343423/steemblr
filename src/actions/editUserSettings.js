import store from "../store";
import { EDIT_USER_SETTINGS } from "./types";

const editUserSettings = props => async dispatch => {
  const settings = store.getState().userSettings;

  settings[props.property] = props.value;
  dispatch({
    type: EDIT_USER_SETTINGS,
    payload: settings
  });
};
export default editUserSettings;
