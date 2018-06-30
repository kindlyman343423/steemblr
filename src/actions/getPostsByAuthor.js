import store from "../store";
import defaultApp from "../environmentDev";
import { GET_POSTS_BY_AUTHOR } from "./types";
export const getPostsByAuthor = props => async dispatch => {
  console.log(props);
  const oldState = store.getState().steemPostsByAuthor.posts;
  let bucket = [];
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .where("author", "==", props.author)
    .orderBy("timestamp")
    .startAfter(
      props.initial === true ||
      props.startPermlink === "" ||
      props.startPermlink === undefined
        ? 0
        : props.startPermlink
    )
    .limit(10);
  dbRef
    .get()
    .then(snapshot => {
      console.log(snapshot);
      snapshot.forEach(doc => {
        bucket.push(doc.data());
      });
      dispatch({
        type: GET_POSTS_BY_AUTHOR,
        payload: oldState.concat(bucket)
      });
      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });

  return bucket[0];
};
