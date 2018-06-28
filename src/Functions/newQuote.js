import api from ".././Api";
import uuidv4 from "uuid/v4";
import store from "../store";
import defaultApp from "../environmentDev";
import { firestore } from "firebase/app";
import postToDb from "./postToDb";
import tagsNSFWCheck from "./tagsNSFWCheck";
const newQuote = (user, titleProp, content, beneficiariesProp, tagsProp) => {
  if (store.getState().steemProfile.profile.user === undefined) {
    api.me();
  }

  const uniqueTags = [...new Set(tagsProp)].filter(item => {
    return item !== "steemblr";
  });
  const uuid = uuidv4() + "u02x93";
  api.broadcast([
    [
      "comment",
      {
        parent_author: "", //MUST BE EMPTY WHEN CREATING NEW POST
        parent_permlink: "steemblr", //FIRST TAG STEEMBLR STAYS HARDCODED AS MAIN TAG
        author: store.getState().steemProfile.profile.user, //AUTHOR
        permlink: uuid, //permlink of the post
        title: titleProp, //Title of the post
        body: content,
        json_metadata: JSON.stringify({
          tags: uniqueTags,
          app: `steemblr`,
          format: "markdown+html",
          community: "steemblr",
          post_type: "quote"
        })
      }
    ],
    [
      "comment_options",
      {
        author: store.getState().steemProfile.profile.user,
        permlink: uuid,
        allow_votes: true,
        allow_curation_rewards: true,
        max_accepted_payout: "1000000.000 SBD",
        percent_steem_dollars: 10000,

        extensions: [
          [
            0,
            {
              beneficiaries: beneficiariesProp
            }
          ]
        ]
      }
    ]
  ]);
  const dbRef = defaultApp
    .firestore()
    .collection("posts")
    .doc(uuid);

  dbRef.set({
    timestamp: firestore.FieldValue.serverTimestamp(),
    isNSFW: tagsNSFWCheck(uniqueTags)
  });
  postToDb(store.getState().steemProfile.profile.user, uuid);
};

export default newQuote;
