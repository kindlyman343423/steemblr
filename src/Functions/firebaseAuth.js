import defaultApp from "../environment";
import "firebase/auth";
const firebaseAuth = async () => {
  defaultApp
    .auth()
    .signInWithCustomToken(localStorage.getItem("googleToken"))
    .catch(function(error) {});
};

export default firebaseAuth;
