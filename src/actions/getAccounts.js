import store from "../store";
import steem from "steem";
import { GET_ACCOUNT } from "./types";
export const getAccounts = props => async dispatch => {
  const query = props;
  let bucket = [];
  const oldState = store.getState().steemAccounts.accounts;
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
};
