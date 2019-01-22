import defaultApp from "../environment";
import "firebase/auth";
import { getLoggedProfile } from "actions/stateActions";
import store from "../store";
const firebaseAuth = async () => {
  defaultApp
    .auth()
    .signInWithCustomToken(localStorage.getItem("googleToken"))
    .catch(function(error) {});
  defaultApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      store.dispatch(getLoggedProfile(user));
    } else {
      // No user is signed in.
    }
  });
};

export default firebaseAuth;
