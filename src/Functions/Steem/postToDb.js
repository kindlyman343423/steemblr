import steem from "steem";
import defaultApp from "../../environment";
import { firestore } from "firebase/app";
import delay from "../delay";
import store from "../../store";
const postToDb = async (author, permlink, isNSFW, postType, tags, postBody) => {
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(permlink);
  let bucket = [];
  let bucket2 = [];
  const platform = store.getState().login.platform;
  if (platform === "steem") {
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

      await steem.api
        .getContentAsync(author, permlink)
        .then(result => {
          bucket2.push(result);

          return bucket2[0];
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    const post = bucket2[0];
    const batch = defaultApp.firestore().batch();
    const isReblogged = store.getState().newPostInterface.isReblogged;
    const newPost = store.getState().newPost;
    batch.set(dbRef, post);

    batch.update(dbRef, {
      uid: store.getState().profile.uid,
      isNSFW: isNSFW,
      post_type: postType,
      timestamp: firestore.FieldValue.serverTimestamp(),
      tags: tags,
      video: store.getState().newPost.video,
      audio: store.getState().newPost.audio,
      quote: store.getState().newPost.quote,
      quoteSource: store.getState().newPost.quoteSource,
      steemblr_body: postBody,
      platform: platform,
      photo: [newPost.photo],
      trending: false,
      comments: [],
      upvotes: [],
      rebloggs: []
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
  }

  return void 0;
};
export default postToDb;
