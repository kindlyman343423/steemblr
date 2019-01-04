import api from "../../Api";

const steemVote = (voter, author, permlink, weight) => {
  api.vote(voter, author, permlink, weight, function(err, res) {
    console.log(err, res);
  });
};

export default steemVote;
