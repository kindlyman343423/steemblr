import defaultApp from "../environment";
import store from "../store";
//Function to save edited settings to database
const saveUserSettings = props => {
  console.log("Saving");
  const settings = store.getState().userSettings;
  const user = store.getState().steemProfile.profile._id;
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(user);

  dbRef
    .update(settings)
    .then(function() {})
    .catch(function(error) {
      //
      console.error("Error updating document: ", error);
    });
};

export default saveUserSettings;
