import api from ".././Api";

const newPost = () => {
  api.broadcast([
    [
      "comment",
      {
        parent_author: "", //MUST BE EMPTY WHEN CREATING NEW POST
        parent_permlink: "test", //FIRST TAG
        author: "snwolak", //AUTHOR
        permlink: "test1234",
        title: "Posting Test",
        body: `Posting comment with steemconnect broadcast`,
        json_metadata: JSON.stringify({
          tags: ["more test", "far more test"],
          app: `steemblr`
        })
      }
    ],
    [
      "comment_options",
      {
        author: "snwolak",
        permlink: "test1234",
        allow_votes: true,
        allow_curation_rewards: true,
        max_accepted_payout: "1000000.000 SBD",
        percent_steem_dollars: 10000,

        extensions: [
          [
            0,
            {
              beneficiaries: [{ account: "steemblr", weight: 2500 }]
            }
          ]
        ]
      }
    ]
  ]);
};

export default newPost;
