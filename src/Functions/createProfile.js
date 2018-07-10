import defaultApp from "../environmentDev";
const createProfile = props => {
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props);
  //checking if profile exist
  dbRef.get().then(doc => {
    if (doc.exists) {
      //TODO: load settings into redux store
    } else {
      //profile doesn't exist so functions creates it with initial settings
      dbRef.set({
        isNSFWAllowed: false
      });
    }
  });
  return void 0;
};

export default createProfile;
