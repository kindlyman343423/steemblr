import defaultApp from "../../environment";
const checkProfile = props => {
  if (props === undefined) {
    return void 0;
  }
  const dbRef = defaultApp
    .firestore()
    .collection("users")
    .doc(props);

  //checking if profile exist in database to decide about loading user blog
  return dbRef
    .get()
    .then(doc => {
      if (doc.exists && doc.data().owner === props) {
        return true;
      } else if (doc.exists && doc.data().owner !== props) {
        return "taken";
      } else {
        return false;
      }
    })
    .then(value => {
      return value;
    });
};

export default checkProfile;
