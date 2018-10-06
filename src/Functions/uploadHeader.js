import firebase from "firebase";
import uuidv4 from "uuid/v4";
import ImageCompressor from "image-compressor.js";
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
  const storage = firebase
    .app()
    .storage("gs://" + process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
  const uuid = uuidv4();
  const storageRef = storage.ref();
  const uploadTask = storageRef.child("headers/" + uuid).put(compressedFile);
  return uploadTask.then(snapshot => {
    return uploadTask.snapshot.ref.getDownloadURL().then(response => {
      return response;
    });
  });
};
export default uploadFiles;
