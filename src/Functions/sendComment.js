import api from ".././Api";

const sendComment = async () => {
  await api.broadcast([
    [
      "comment",
      {
        parent_author: "snwolak", //AUTHOR OF ORGINAL POST
        parent_permlink: "test1234", //PERMLINK OF THE POST
        author: "snwolak", //AUTHOR OF THE COMMENT
        permlink: "h8h8", // PERMLINK OF THE COMMENT MUST BE GENERATED
        title: "",
        body: `testing replies`,
        json_metadata: JSON.stringify({
          tags: ["more test", "far more test"]
        })
      }
    ]
  ]);
};

export default sendComment;
