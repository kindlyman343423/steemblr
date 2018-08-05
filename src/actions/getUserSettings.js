import defaultApp from "../environment";
import store from "../store";
import { GET_USER_SETTINGS } from "./types";

const getUserSettings = props => async dispatch => {
  const username = store.getState().steemProfile.profile._id;
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(username);

  await dbRef
    .get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_USER_SETTINGS,
          payload: doc.data()
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default getUserSettings;
