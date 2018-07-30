import store from "../store";
import defaultApp from "../environment";
import { GET_ACCOUNT } from "./types";
export const getAccounts = props => async dispatch => {
  //Checking store for profile info, if profile not found calling api/db and dispatching to store

  let bucket = [];
  const oldState = store.getState().steemAccounts.accounts;
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props[0])
    .collection("blog")
    .doc("layout");
  const search = store.getState().steemAccounts.accounts.filter(acc => {
    return acc.author === props[0];
  });
  if (search.length !== 0) {
    return void 0;
  } else {
    await dbRef
      .get()
      .then(doc => bucket.push(doc.data()))
      .catch(function(error) {
        console.log("Error getting cached document:", error);
      });
    const newState = oldState.concat(bucket[0]);
    dispatch({
      type: GET_ACCOUNT,
      payload: newState
    });
  }
};
