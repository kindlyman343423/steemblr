import api from ".././Api";
import uuidv4 from "uuid/v4";
import store from "../store";
import postToDb from "./postToDb";
import tagsNSFWCheck from "./tagsNSFWCheck";
import makePost from "./makePost";
import { newPostIsError, newPostErrorMsg } from "../actions/newPostInterface";
const newPost = async () => {
  const post = makePost();
  const storeState = store.getState();
  const uniqueTags = [...new Set(storeState.newPost.tags)];
  const uuid = uuidv4() + "u02x93";
  store.dispatch(newPostIsError(false));
  await api
    .broadcast([
      [
        "comment",
        {
          parent_author: "", //MUST BE EMPTY WHEN CREATING NEW POST
          parent_permlink:
            uniqueTags[0] === undefined ? "steemblr" : uniqueTags[0], // MAIN TAG
          author: store.getState().steemProfile.profile.user, //AUTHOR
          permlink: uuid, //permlink of the post
          title: post.title, //Title of the post
          body: post.body,
          json_metadata: JSON.stringify({
            tags: uniqueTags,
            app: `steemblr/0.1`,
            format: "markdown+html",
            community: "steemblr",
            post_type: post.type,
            image:
              post.type === "photos" || "gifs" ? [storeState.newPost.photo] : ""
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
                beneficiaries: [{ account: "steemblr", weight: 1500 }]
              }
            ]
          ]
        }
      ]
    ])
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      store.dispatch(newPostIsError(true));
      store.dispatch(newPostErrorMsg(err.error_description));
    });

  postToDb(
    storeState.steemProfile.profile.user,
    uuid,
    tagsNSFWCheck(uniqueTags),
    storeState.newPost.type,
    uniqueTags
  );
};

export default newPost;
