import store from "../../store";
//function to check if user upvoted steem post on the blockchain
const isUpvoted = props => {
  if (props === undefined) {
    return 0;
  }
  const uid = store.getState().profile.uid;
  const find = props.find(vote => vote.voter === uid);
  if (find) {
    return find.weight;
  } else {
    return 0;
  }
};

export default isUpvoted;
