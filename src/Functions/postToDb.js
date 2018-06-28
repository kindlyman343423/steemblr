import axios from "axios";
import steem from "steem";
import defaultApp from "../environmentDev";
import { firestore } from "firebase/app";

const postToDb = async (author, permlink, isNSFW) => {
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
    console.log(post);
    const batch = defaultApp.firestore().batch();
    batch.set(dbRef, post);
    batch.update(dbRef, {
      isNSFW: isNSFW,
      timestamp: firestore.FieldValue.serverTimestamp()
    });
    batch.commit().then(function() {
      return void 0;
    });
  }

  return void 0;
};
export default postToDb;
