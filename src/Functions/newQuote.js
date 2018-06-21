import api from ".././Api";
import uuidv4 from "uuid/v4";
import store from "../store";
const newQuote = (user, titleProp, content, beneficiariesProp, tagsProp) => {
  if (store.getState().steemProfile.profile.user === undefined) {
    api.me();
  }
  tagsProp.push("steemblr");
  const uniqueTags = [...new Set(tagsProp)];
  const finalTags = uniqueTags.slice(1, uniqueTags.length);
  const uuid = uuidv4() + "u02x93";
  api.broadcast([
    [
      "comment",
      {
        parent_author: "", //MUST BE EMPTY WHEN CREATING NEW POST
        parent_permlink: tagsProp[0], //FIRST TAG
        author: store.getState().steemProfile.profile.user, //AUTHOR
        permlink: uuid, //permlink of the post
        title: titleProp, //Title of the post
        body: content,
        json_metadata: JSON.stringify({
          tags: finalTags,
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
};

export default newQuote;
