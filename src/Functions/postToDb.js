import axios from "axios";
import steem from "steem";
const url = ""; //enter function adress here

const postToDb = async (author, permlink) => {
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
    axios.post(url, bucket[0]).then(function(response) {});
  }

  return void 0;
};
export default postToDb;
