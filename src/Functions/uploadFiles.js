import firebase from "firebase";
import uuidv4 from "uuid/v4";
import store from "../store";
import { putPostMedia } from "../actions/stateActions";
const uploadFiles = async props => {
  const storage = firebase.app().storage("gs://steemblr.appspot.com");

  const storageRef = storage.ref();
  const uploadTask = storageRef.child("images/" + uuidv4()).put(props);
  let url = "";
  await uploadTask.then(response => {
    url = response.downloadURL;
    return response.downloadURL;
  });
  return url;
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("User doesn't have permission to access the object");
          break;

        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("Unknown error");
          break;
        default:
          console.log("Unknown Error");
      }
    },
    function() {
      // Upload completed successfully, now we can get the download URL

      const downloadURL = uploadTask.snapshot.downloadURL;
      store.dispatch(putPostMedia(downloadURL));
      return downloadURL;
    }
  );
};
export default uploadFiles;
