import api from ".././Api";

const followSteem = (follower, following) => {
  api.follow(follower, following, function(err, res) {
    //console.log(err, res)
  });

  //console.log(follower, following)
};

export default followSteem;
