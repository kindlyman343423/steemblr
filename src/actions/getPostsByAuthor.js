import store from "../store";
import defaultApp from "../environment";
import { GET_POSTS_BY_AUTHOR } from "./types";
export const getPostsByAuthor = props => async dispatch => {
  const oldState = store.getState().steemPostsByAuthor.posts;
  let bucket = [];
  let timestamp = [];
  if (props.timestamp === undefined) {
    const getLatest = async () => {
      const dbRef = defaultApp
        .firestore()
        .collection("posts")
        .orderBy("timestamp", "desc")
        .limit(1);
      await dbRef.get().then(snapshot => {
        snapshot.forEach(doc => {
          return timestamp.push(doc.data().timestamp);
        });
      });
    };
    await getLatest();
    const dbRef = defaultApp
      .firestore()
      .collection("posts")
      .where("author", "==", props.author)
      .orderBy("timestamp", "desc")
      .startAt(timestamp[0])
      .limit(10);
    dbRef
      .get()
      .then(snapshot => {
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
  } else {
    const dbRef = defaultApp
      .firestore()
      .collection("posts")
      .where("author", "==", props.author)
      .orderBy("timestamp", "desc")
      .startAfter(props.timestamp)
      .limit(10);
    dbRef
      .get()
      .then(snapshot => {
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
  }

  return bucket[0];
};
