import api from ".././Api";
import uuidv4 from "uuid/v4";
const newPost = (user, titleProp, content, tagsProp, type) => {
  const uuid = uuidv4();
  api.broadcast([
    [
      "comment",
      {
        parent_author: "", //MUST BE EMPTY WHEN CREATING NEW POST
        parent_permlink: "test", //FIRST TAG
        author: user, //AUTHOR
        permlink: uuid, //permlink of the post
        title: titleProp, //Title of the post
        body: content,
        json_metadata: JSON.stringify({
          tags: tagsProp,
          app: `steemblr`,
          format: "markdown+html",
          community: "steemblr"
        })
      }
    ],
    [
      "comment_options",
      {
        author: user,
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
  ]);
};

export default newPost;
