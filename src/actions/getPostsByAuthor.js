import store from "../store";
import steem from "steem";
import { GET_POSTS_BY_AUTHOR } from "./types";
export const getPostsByAuthor = props => async dispatch => {
  console.log(props);
  const oldState = store.getState().steemPostsByAuthor.posts;
  let bucket = [];

  await steem.api
    .getDiscussionsByAuthorBeforeDateAsync(
      props.author,
      props.startPermlink,
      props.beforeDate,
      10
    )
    .then(result => {
      bucket.push(result);
      console.log(bucket);
      dispatch({
        type: GET_POSTS_BY_AUTHOR,
        payload: props.initial
          ? oldState.concat(bucket[0])
          : oldState.concat(bucket[0].splice(1))
      });
      return bucket[0];
    })
    .catch(function(error) {
      console.log(error);
    });
  return bucket[0];
};
