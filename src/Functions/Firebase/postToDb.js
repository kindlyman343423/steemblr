import defaultApp from "../../environment";
import { firestore } from "firebase/app";
import store from "../../store";
const postToDb = async (author, permlink, isNSFW, postType, tags, postBody) => {
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(permlink);
  const username = store.getState().login.username;
  const platform = store.getState().login.platform;
  const batch = defaultApp.firestore().batch();
  const isReblogged = store.getState().newPostInterface.isReblogged;
  const newPost = store.getState().newPost;
  batch.set(dbRef, { permlink: permlink });

  batch.update(dbRef, {
    isNSFW: isNSFW,
    post_type: postType,
    timestamp: firestore.FieldValue.serverTimestamp(),
    tags: tags,
    video: newPost.video,
    audio: newPost.audio,
    quote: newPost.quote,
    quoteSource: newPost.quoteSource,
    steemblr_body: postBody,
    posted_by: platform,
    trending: false,
    rating: 0,
    author: username,
    children: 0,
    active_votes: [],
    title: newPost.title
  });
  if (isReblogged) {
    batch.update(dbRef, {
      reblogged_post: newPost.reblogged_post,
      is_reblogged: true
    });
  } else {
    batch.update(dbRef, {
      is_reblogged: false
    });
  }

  batch
    .commit()
    .then(function() {
      return void 0;
    })
    .catch(err => {
      console.log(err);
    });

  return void 0;
};
export default postToDb;
