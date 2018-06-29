import defaultApp from "../environmentDev";
import store from "../store";
import { GET_NEW_POSTS } from "./types";
const getNewPosts = props => async dispatch => {
  const oldState = store.getState().steemPosts.posts;
  let bucket = [];
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .orderBy("timestamp")
    .startAfter(props.start_permlink === undefined ? 0 : props.start_permlink)
    .limit(10);
  switch (props.category) {
    case "new":
      dbRef
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            bucket.push(doc.data());
          });
          dispatch({
            type: GET_NEW_POSTS,
            payload: oldState.concat(bucket)
          });
          return bucket[0];
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
      break;
    default:
      dbRef
        .where("post_type", "==", props.category)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            bucket.push(doc.data());
            console.log(bucket);
          });
          dispatch({
            type: GET_NEW_POSTS,
            payload: oldState.concat(bucket)
          });
          return bucket[0];
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
  }
};
export default getNewPosts;
