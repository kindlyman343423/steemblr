import api from "../.././Api";
import uuidv4 from "uuid/v4";
import store from "../../store";
import postToDb from "./postToDb";
import tagsNSFWCheck from "../tagsNSFWCheck";
import makePost from "../makePost";
import {
  newPostIsError,
  newPostErrorMsg
} from "../../actions/newPostInterface";
import rebloggedBody from "./rebloggedBody";
const newPost = async () => {
  const post = makePost();
  const storeState = store.getState();
  const isEditing = storeState.newPostInterface.editingExistingPost;
  const isReblogged = storeState.newPostInterface.isReblogged;
  const uniqueTagsForDB = [...new Set(storeState.newPost.tags)];
  let uniqueTags = [...new Set(storeState.newPost.tags)];
  uniqueTags.includes("steemblr") ? void 0 : uniqueTags.push("steemblr");
  const uuid = isEditing ? storeState.newPost.permlink : uuidv4() + "u02x93";
  const rebloggedPost = store.getState().newPost.reblogged_post;
  const postFooter = [
    `</br><a href="${`https://steemblr.com/post/@${
      store.getState().steemProfile.profile.user
    }/` + uuid}">View this post on steemblr</a>`
  ];

  store.dispatch(newPostIsError(false));

  if (isEditing) {
    await api
      .broadcast([
        [
          "comment",
          {
            parent_author: "", //MUST BE EMPTY WHEN CREATING NEW POST
            parent_permlink: storeState.newPost.parent_permlink, // MAIN TAG CANNOT BE CHANGED
            author: store.getState().steemProfile.profile.user, //AUTHOR
            permlink: uuid, //permlink of the post
            title: post.title, //Title of the post
            body: post.body.concat(postFooter),
            json_metadata: JSON.stringify({
              tags: uniqueTags,
              app: `steemblr/0.1`,
              format: "markdown+html",
              community: "steemblr",
              post_type: post.type,
              image:
                post.type === "photos" || "gifs"
                  ? [storeState.newPost.photo]
                  : ""
            })
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
  } else if (isReblogged) {
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
            body: rebloggedBody({ post: post.body, uuid: uuid }).body,
            json_metadata: JSON.stringify({
              tags: uniqueTags,
              app: `steemblr/0.1`,
              format: "markdown+html",
              community: "steemblr",
              post_type: post.type,
              image:
                post.type === "photos" || "gifs"
                  ? [storeState.newPost.photo]
                  : ""
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
                  beneficiaries: [
                    { account: "steemblr", weight: 500 },
                    { account: rebloggedPost.author, weight: 4750 }
                  ]
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
  } else {
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
            body: post.body.concat(postFooter),
            json_metadata: JSON.stringify({
              tags: uniqueTags,
              app: `steemblr/0.1`,
              format: "markdown+html",
              community: "steemblr",
              post_type: post.type,
              image:
                post.type === "photos" || "gifs"
                  ? [storeState.newPost.photo]
                  : ""
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
                  beneficiaries: [{ account: "steemblr", weight: 500 }]
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
  }
  postToDb(
    storeState.steemProfile.profile.user,
    uuid,
    tagsNSFWCheck(uniqueTags),
    storeState.newPost.type,
    uniqueTagsForDB,
    post.body
  );
};

export default newPost;
