import firebase from "firebase";
import uuidv4 from "uuid/v4";
import store from "../store";
import { putUUIDOfImage } from "../actions/stateActions";
const uploadFiles = async props => {
  const storage = firebase.app().storage("gs://steemblr-dev.appspot.com");
  const uuid = uuidv4();
  const storageRef = storage.ref();
  const uploadTask = storageRef.child("headers/" + uuid).put(props);
  let url = "";
  await uploadTask.then(response => {
    url = response.downloadURL;
    return response.downloadURL;
  });
  store.dispatch(putUUIDOfImage(uuid));
  return url;
};
export default uploadFiles;
