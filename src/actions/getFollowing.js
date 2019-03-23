import defaultApp from "../environment";
import store from "../store";
import { GET_FOLLOWING } from "./types";
const getFollowing = props => async dispatch => {
  const username = store.getState().login.username;

  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(username);

  await dbRef
    .get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_FOLLOWING,
          payload: doc.data().following
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export default getFollowing;
