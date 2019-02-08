import uuidv4 from "uuid/v4";
import store from "../../store";
//Sending upvote to firebase api
const upvotePost = async props => {
  const uuid = uuidv4();
  const url = process.env.REACT_APP_FIREBASE_UPVOTE_POST;
  const state = store.getState();
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        id: uuid,
        uid: state.profile.uid,
        voter: state.login.username,
        platform: state.login.platform,
        token: state.profile._lat,
        ...props
      }
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export default upvotePost;
