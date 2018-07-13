import store from "../store";
import { EDIT_THEME } from "./types";
//Action for theme editor
export const editTheme = props => async dispatch => {
  //Searching for user account in store
  const search = store.getState().steemAccounts.accounts.filter(acc => {
    return acc.author === props.author;
  });
  //Setting property to value changed in theme editor
  search[0][props.property] = props.value;
  //Filtering old account state to make place for new one
  const oldState = store.getState().steemAccounts.accounts.filter(acc => {
    return acc.author !== props.author;
  });
  let bucket = [];
  bucket.push(search);
  const newState = oldState.concat(bucket[0]);
  dispatch({
    type: EDIT_THEME,
    payload: newState
  });
};
