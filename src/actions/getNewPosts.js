import defaultApp from "../environmentDev";
import store from "../store";
import { GET_NEW_POSTS } from "./types";
const getNewPosts = props => async dispatch => {
  const query = {
    tag: props.tag,
    limit: 10,
    start_permlink: props.start_permlink,
    start_author: props.start_author
  };
  const oldState = store.getState().steemPosts.posts;
  let bucket = [];
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .limit(10);
  const get = dbRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        bucket.push(doc.data());
      });
      dispatch({
        type: GET_NEW_POSTS,
        payload: oldState.concat(
          query.start_permlink === undefined ? bucket[0] : bucket[0].splice(1)
        )
      });
      return bucket[0];
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  console.log(get);
};
export default getNewPosts;
