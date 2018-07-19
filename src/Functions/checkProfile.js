import defaultApp from "../environmentDev";
const checkProfile = props => {
  if (props === undefined) {
    return void 0;
  }
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props)
    .collection("blog")
    .doc("layout");

  //checking if profile exist in database to decide about loading user blog
  return dbRef
    .get()
    .then(doc => {
      if (doc.exists) {
        return true;
      } else {
        return false;
      }
    })
    .then(value => {
      return value;
    });
};

export default checkProfile;
