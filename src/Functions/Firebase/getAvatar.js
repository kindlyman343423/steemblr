import defaultApp from "../../environment";
import "firebase/storage";

const getAvatar = async props => {
  //Function to get URL of user profile picture from firebase storage
  //every avatar will be in avatar storage bucket with blog's name as a file name

  const storage = defaultApp.storage();
  const path = storage.ref("avatars/" + props);
  return await path
    .getDownloadURL()
    .then(url => {
      return url;
    })
    .catch(err => {
      console.log(err);
    });
};

export default getAvatar;
