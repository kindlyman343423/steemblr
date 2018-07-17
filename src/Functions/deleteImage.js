import firebase from "firebase/app";
import store from "../store";
const deleteImage = () => {
  const imageUUID = store.getState().newPost.imageUUID;
  const storage = firebase.app().storage("gs://steemblr.appspot.com");
  const storageRef = storage.ref();
  const deleteRef = storageRef.child("images/" + imageUUID);
  deleteRef
    .delete()
    .then(function() {})
    .catch(function(error) {
      console.log(`Deletion error ${error}`);
    });
};

export default deleteImage;
