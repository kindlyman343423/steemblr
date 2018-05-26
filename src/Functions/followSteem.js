import api from ".././Api";
import store from "../store";
import { postFollowingToState } from "../actions/stateActions";
const followSteem = (follower, following) => {
  api.follow(follower, following, function(err, res) {
    //console.log(err, res)
  });
  store.dispatch(postFollowingToState(following));
  //console.log(follower, following)
};

export default followSteem;
