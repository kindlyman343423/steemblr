import defaultApp from "../environment";
import store from "../store";
import { GET_NEW_POSTS } from "./types";
const getNewPosts = props => async dispatch => {
  const oldState = store.getState().steemPosts.posts;
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
      .orderBy("timestamp", "desc")
      .startAt(timestamp[0])
      .limit(5);

    switch (props.category) {
      case "new":
        await dbRef
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (doc.data().author === "" || doc.data().author === undefined) {
                return void 0;
              } else {
                bucket.push(doc.data());
              }
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
        await dbRef
          .where("post_type", "==", props.category)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (doc.data().author === "" || doc.data().author === undefined) {
                return void 0;
              } else {
                bucket.push(doc.data());
              }
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
  } else {
    const dbRef = defaultApp
      .firestore()
      .collection("posts")
      .orderBy("timestamp", "desc")
      .startAfter(props.timestamp)
      .limit(5);

    switch (props.category) {
      case "new":
        await dbRef
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (doc.data().author === "" || doc.data().author === undefined) {
                return void 0;
              } else {
                bucket.push(doc.data());
              }
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
        await dbRef
          .where("post_type", "==", props.category)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (doc.data().author === "" || doc.data().author === undefined) {
                return void 0;
              } else {
                bucket.push(doc.data());
              }
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
  }
};
export default getNewPosts;
