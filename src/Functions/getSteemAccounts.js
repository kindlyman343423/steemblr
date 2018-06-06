import steem from "steem";
const getSteemAccounts = async props => {
  const query = props;
  let bucket = [];
  await steem.api
    .getAccountsAsync(query)
    .then(result => {
      bucket.push(result);
      return result;
    })
    .catch(function(error) {
      console.log(error);
    });
  console.log(bucket);
  return bucket[0];
};
export default getSteemAccounts;
