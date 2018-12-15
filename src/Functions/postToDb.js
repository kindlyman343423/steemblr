import steem from "steem";
import defaultApp from "../environment";
import { firestore } from "firebase/app";
import delay from "./delay";
import store from "../store";
const postToDb = async (author, permlink, isNSFW, postType, tags, postBody) => {
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(permlink);
  let bucket = [];

  await steem.api
    .getContentAsync(author, permlink)
    .then(result => {
      bucket.push(result);

      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });
  if (bucket[0].parent_author === "") {
    await delay(5000);
    let bucket2 = [];
    await steem.api
      .getContentAsync(author, permlink)
      .then(result => {
        bucket2.push(result);

        return bucket2[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    const post = bucket2[0];
    const batch = defaultApp.firestore().batch();
    const isReblogged = store.getState().newPostInterface.isReblogged;
    const newPost = store.getState().newPost;
    batch.set(dbRef, post);
    if (isReblogged) {
      batch.update(dbRef, {
        isNSFW: isNSFW,
        post_type: postType,
        timestamp: firestore.FieldValue.serverTimestamp(),
        tags: tags,
        video: store.getState().newPost.video,
        audio: store.getState().newPost.audio,
        quote: store.getState().newPost.quote,
        quoteSource: store.getState().newPost.quoteSource,
        steemblr_body: newPost.body,
        reblogged_post: newPost.reblogged_post,
        is_reblogged: true,
        posted_by: "steem"
      });
    } else {
      batch.update(dbRef, {
        isNSFW: isNSFW,
        post_type: postType,
        timestamp: firestore.FieldValue.serverTimestamp(),
        tags: tags,
        video: store.getState().newPost.video,
        audio: store.getState().newPost.audio,
        quote: store.getState().newPost.quote,
        quoteSource: store.getState().newPost.quoteSource,
        steemblr_body: postBody,
        is_reblogged: false,
        posted_by: "steem"
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
  }

  return void 0;
};
export default postToDb;
