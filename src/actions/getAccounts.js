import store from "../store";
import steem from "steem";
import { GET_ACCOUNT } from "./types";
export const getAccounts = props => async dispatch => {
  //Checking store for profile info, if profile not found calling api/db and dispatching to store
  const query = props;
  let bucket = [];
  const oldState = store.getState().steemAccounts.accounts;
  const search = store.getState().steemAccounts.accounts.filter(acc => {
    return acc.name === props[0];
  });
  if (search.length !== 0) {
    return void 0;
  } else {
    await steem.api
      .getAccountsAsync(query)
      .then(result => {
        bucket.push(result);
        return result;
      })
      .catch(function(error) {
        console.log(error);
      });
    const newState = oldState.concat(bucket[0]);
    dispatch({
      type: GET_ACCOUNT,
      payload: newState
    });
  }
};
