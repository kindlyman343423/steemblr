import steem from "steem";
import defaultApp from "../environment";
import { firestore } from "firebase/app";

const postToDb = async (author, permlink, isNSFW, postType, tags) => {
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
    const post = bucket[0];
    const batch = defaultApp.firestore().batch();
    batch.set(dbRef, post);
    batch.update(dbRef, {
      isNSFW: isNSFW,
      post_type: postType,
      timestamp: firestore.FieldValue.serverTimestamp(),
      tags: tags
    });
    batch.commit().then(function() {
      return void 0;
    });
  }

  return void 0;
};
export default postToDb;
