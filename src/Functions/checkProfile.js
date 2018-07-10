import defaultApp from ".././environmentDev";
const checkProfile = props => {
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props);
  //checking if profile exist in database to decide about loading user blog
  return dbRef.get().then(doc => {
    if (doc.exists) {
      return true;
    } else {
      return false;
    }
  });
};

export default checkProfile;
