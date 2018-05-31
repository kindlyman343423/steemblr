import defaultApp from "../environment";
import "firebase/auth";
const firebaseAuth = async () => {
  defaultApp
    .auth()
    .signInWithCustomToken(localStorage.getItem("cToken"))
    .catch(function(error) {});
};

export default firebaseAuth;
