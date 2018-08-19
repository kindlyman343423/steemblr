import firebase from "firebase";
import uuidv4 from "uuid/v4";
const uploadFiles = async props => {
  const storage = firebase
    .app()
    .storage("gs://" + process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
  const uuid = uuidv4();
  const storageRef = storage.ref();
  const uploadTask = storageRef.child("headers/" + uuid).put(props);
  return uploadTask.then(snapshot => {
    return uploadTask.snapshot.ref.getDownloadURL().then(response => {
      return response;
    });
  });
};
export default uploadFiles;
