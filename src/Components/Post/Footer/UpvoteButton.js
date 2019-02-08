import React, { Component } from "react";
import isUpvotedSteem from "Functions/Steem/isUpvoted";
import isUpvotedFirebase from "Functions/Firebase/isUpvoted";
import upvotePost from "Functions/Firebase/upvotePost";
import upvoteSteemPost from "Functions/Firebase/upvoteSteemPost";
import steemVote from "Functions/Steem/steemVote";
import { postVoteToState, removeVoteFromState } from "actions/stateActions";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import store from "../../../store";
import updatePost, { updatePostByAuthor } from "actions/updatePost";
export default class UpvoteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 0
    };
  }
  componentDidMount() {
    const { platform, activeVotes, upvotes } = this.props; //Post platform
    const login = store.getState().login;
    if (login.status && login.platform === "steem") {
      //when user logged in with steem account
      if (platform === "steem") {
        //If post is posted on steem blockchain
        this.setState({
          weight: isUpvotedSteem(activeVotes)
        });
      } else if (platform === "email") {
        //If post is posted to firebase db
        this.setState({
          weight: isUpvotedFirebase(upvotes)
        });
      }
    } else if (login.status && login.platform === "email") {
      //when user logged in with non-steem account
      this.setState({
        weight: isUpvotedFirebase(upvotes)
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { activeVotes, upvotes } = this.props;
    if (
      activeVotes !== prevProps.activeVotes ||
      upvotes !== prevProps.upvotes
    ) {
      if (this.props.platform === "steem") {
        this.setState({
          weight: isUpvotedSteem(this.props.activeVotes)
        });
      } else if (this.props.platform === "email") {
        this.setState({
          weight: isUpvotedFirebase(this.props.upvotes)
        });
      }
    }
  }
  handleVoteBtn = async () => {
    const { permlink, location } = this.props;
    const login = store.getState().login;
    if (login.status) {
      await this.handleVoting();
      if (location === "blog") {
        store.dispatch(updatePost(permlink));
        store.dispatch(updatePostByAuthor(permlink));
      } else {
        store.dispatch(updatePost(permlink));
      }
    } else {
      alert("You have to login first");
    }
  };
  handleVoting = async () => {
    const { platform, permlink, author } = this.props;
    const { weight } = this.state;
    const login = store.getState().login;
    if (login.status && login.platform === "steem") {
      //If user logged in with steem account
      if (weight === 0) {
        if (platform === "email") {
          //voting on non-blockchain posts
          await upvotePost({ permlink: permlink, weight: 1 });
          this.setState({
            weight: 1
          });
        } else if (platform === "steem") {
          //voting on steem blockchain posts
          await steemVote(
            login.username,
            author,
            permlink,
            store.getState().votePower.power
          );
          await upvoteSteemPost({
            permlink: permlink,
            weight: store.getState().votePower.power
          });
          this.props.updateValue(store.getState().votePower.power);
          this.updateVotingState(
            {
              permlink: author + "/" + permlink,
              percent: store.getState().votePower.power
            },
            true
          );
          this.setState({
            weight: store.getState().votePower.power
          });
        }
      } else if (weight > 0) {
        //unvoting post
        if (platform === "email") {
          //voting on non-blockchain posts
          await upvotePost({ permlink: permlink, weight: 0 });
          this.setState({
            weight: 0
          });
        } else if (platform === "steem") {
          //unvoting steem blockchain post
          await steemVote(login.username, author, permlink, 0);
          await upvoteSteemPost({
            permlink: permlink,
            weight: 0
          });
          this.props.updateValue(0);
          this.updateVotingState(
            {
              permlink: author + "/" + permlink,
              percent: 0
            },
            false
          );
          this.setState({
            weight: 0
          });
        }
      }
    } else if (login.status && login.platform === "email") {
      //If user logged in with steem account
      if (weight === 0) {
        //upvoting the post
        await upvotePost({
          permlink: permlink,
          weight: 1
        });
        this.props.updateValue(1);
        this.setState({
          weight: 1
        });
      } else if (weight > 0) {
        //unvoting the post
        await upvotePost({
          permlink: permlink,
          weight: 0
        });
        this.props.updateValue(0);
        this.setState({
          weight: 0
        });
      }
    } else {
      alert("You have to login first");
    }
  };

  updateVotingState = (props, action) => {
    if (action === true) {
      store.dispatch(postVoteToState(props));
    } else if (action === false) {
      store.dispatch(removeVoteFromState(props));
    }
  };
  render() {
    const { weight } = this.state;
    const heartIconStyle = {
      cursor: "pointer",
      color: weight > 0 ? "red" : "black"
    };
    return (
      <Icon
        size={30}
        icon={ic_favorite}
        style={heartIconStyle}
        onClick={this.handleVoteBtn}
      />
    );
  }
}
UpvoteButton.propTypes = {
  platform: PropTypes.string,
  activeVotes: PropTypes.array,
  upvotes: PropTypes.array,
  permlink: PropTypes.string,
  author: PropTypes.author
};
