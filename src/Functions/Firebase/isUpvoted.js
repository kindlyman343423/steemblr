import store from "../../store";
//Checking if posts is upvoted by user
const isUpvoted = props => {
  if (props === undefined) {
    return 0;
  }
  const uid = store.getState().profile.uid;
  const find = props.find(vote => vote.uid === uid);
  if (find) {
    return find.weight;
  } else {
    return 0;
  }
};

export default isUpvoted;
