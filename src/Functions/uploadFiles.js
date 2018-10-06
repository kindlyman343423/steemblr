import firebase from "firebase";
import uuidv4 from "uuid/v4";
import ImageCompressor from "image-compressor.js";
import store from "../store";
const uploadFiles = async props => {
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
  const postType = store.getState().newPost.type;
  const storage = firebase
    .app()
    .storage("gs://" + process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
  const uuid = uuidv4();
  const storageRef = storage.ref();
  const uploadTask = storageRef
    .child("images/" + uuid)
    .put(postType === "gifs" ? props : compressedFile);

  return uploadTask.then(snapshot => {
    return uploadTask.snapshot.ref.getDownloadURL().then(response => {
      return response;
    });
  });
};
export default uploadFiles;
