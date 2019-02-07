import firebase from "firebase/app";
import ImageCompressor from "image-compressor.js";
import store from "../../store";
const uploadFiles = async props => {
  const login = store.getState().login;
  const imageCompressor = new ImageCompressor();
  const compressedFile = await imageCompressor
    .compress(props, {
      quality: 0.75
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
  const storage = firebase
    .app()
    .storage("gs://" + process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
  const storageRef = storage.ref();
  const uploadTask = storageRef
    .child("avatars/" + login.username)
    .put(compressedFile);
  return uploadTask.then(snapshot => {
    return uploadTask.snapshot.ref.getDownloadURL().then(response => {
      return response;
    });
  });
};
export default uploadFiles;
