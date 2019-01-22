import { UPDATE_POST, UPDATE_POST_BY_AUTHOR } from "./types";
import store from "../store";
import defaultApp from "../environment";
import delay from "Functions/delay";
const updatePost = props => async dispatch => {
  await delay(2000);
  const permlink = props;
  const posts = store.getState().steemPosts.posts;
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(permlink);
  const updatedPost = await dbRef
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .catch(err => {
      console.log(err);
    });
  const updatedPosts = posts.map(post => {
    if (post.permlink === permlink) {
      post = updatedPost;
    }
    return post;
  });

  return dispatch({
    type: UPDATE_POST,
    payload: updatedPosts
  });
};
export default updatePost;
export const updatePostByAuthor = props => async dispatch => {
  await delay(2000);
  const permlink = props;
  const posts = store.getState().steemPostsByAuthor.posts;
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(permlink);
  const updatedPost = await dbRef
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .catch(err => {
      console.log(err);
    });
  const updatedPosts = posts.map(post => {
    if (post.permlink === permlink) {
      post = updatedPost;
    }
    return post;
  });

  return dispatch({
    type: UPDATE_POST_BY_AUTHOR,
    payload: updatedPosts
  });
};
