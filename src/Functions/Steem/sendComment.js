import api from "../.././Api";

const sendComment = async (
  postAuthor,
  postPermlink,
  commentAuthor,
  comment,
  uuid
) => {
  await api.broadcast([
    [
      "comment",
      {
        parent_author: postAuthor, //AUTHOR OF ORGINAL POST
        parent_permlink: postPermlink, //PERMLINK OF THE POST
        author: commentAuthor, //AUTHOR OF THE COMMENT
        permlink: uuid, // PERMLINK OF THE COMMENT
        title: "",
        body: comment,
        json_metadata: JSON.stringify({
          tags: []
        })
      }
    ]
  ]);
};

export default sendComment;
