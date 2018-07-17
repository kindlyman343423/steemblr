import firebase from "firebase";
import uuidv4 from "uuid/v4";
const uploadFiles = async props => {
  const storage = firebase.app().storage("gs://steemblr.appspot.com");
  const uuid = uuidv4();
  const storageRef = storage.ref();
  const uploadTask = storageRef.child("images/" + uuid).put(props);
  return uploadTask.then(snapshot => {
    return uploadTask.snapshot.ref.getDownloadURL().then(response => {
      return response;
    });
  });
};
export default uploadFiles;
