import defaultApp from "../environment";
import store from "../store";
import { GET_USER_SETTINGS } from "./types";
import createProfile from "../Functions/Firebase/createProfile";
const getUserSettings = props => async dispatch => {
  const username = usernameChecker();
  const emailProfile = store.getState().profile;
  const platform = store.getState().login.platform;
  if (username === undefined) {
    window.location.reload();
  }
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
      } else {
        if (platform === "email") {
          createProfile({
            token: emailProfile._lat,
            displayName: emailProfile.displayName,
            email: emailProfile.email,
            uid: emailProfile.uid
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
};
const usernameChecker = () => {
  const steemUser = store.getState().steemProfile.profile._id;
  const emailUser = store.getState().profile.displayName;
  const platform = store.getState().login.platform;
  switch (platform) {
    case "steem":
      return steemUser;
    case "email":
      return emailUser;
    default:
      break;
  }
};
export default getUserSettings;
