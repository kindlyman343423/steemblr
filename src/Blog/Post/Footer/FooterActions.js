import React, { Component } from "react";
import ShareMenu from "Components/Post/Footer/ShareMenu";
import Reblog from "Components/Post/Footer/Reblog";
import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import EditPost from "Components/Post/Footer/EditPost";
import checkValueState from "Functions/checkValueState";
import store from "../../../store";
import steemVote from "Functions/Steem/steemVote";
import { postVoteToState, removeVoteFromState } from "actions/stateActions";
import getVoteWorth from "Functions/getVoteWorth";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentsContainer from "Blog/Post/Footer/CommentsContainer";
import { FooterActionsContainer, FooterItem } from "../Post.styles";
import { FormattedRelative } from "react-intl";
import UpvoteButton from "Components/Post/Footer/UpvoteButton";
import countActions from "Functions/countActions";
const Actions = styled.span`
  display: flex;
  align-items: center;
`;
export default class FooterActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      userPlatform: store.getState().login.platform,
      shouldOpenComments: false,
      allowEdit: false
    };
  }

  handleValue() {
    //checking value of the post
    this.setState({
      value: checkValueState([
        this.props.post.total_payout_value.replace("SBD", ""),
        this.props.post.pending_payout_value.replace("SBD", ""),
        this.props.post.total_pending_payout_value.replace("STEEM", ""),
        this.props.post.curator_payout_value.replace("SBD", "")
      ])
    });
  }
  componentDidMount() {
    const login = store.getState().login;
    const profile = store.getState().profile;
    const { post } = this.props;
    this.setState({
      actions: post.actions
    });
    if (post.platform === "steem") {
      this.setState({
        value: checkValueState([
          post.total_payout_value.replace("SBD", ""),
          post.pending_payout_value.replace("SBD", ""),
          post.total_pending_payout_value.replace("STEEM", ""),
          post.curator_payout_value.replace("SBD", "")
        ])
      });
    }
    if (login.status && profile.uid === post.uid) {
      this.setState({
        allowEdit: true
      });
    }
  }
  handleVoting = async (username, author, permlink, votePercent) => {
    //casting a vote to the blockchain and dispatching to redux store
    const login = store.getState().login;
    if (login.status && login.platform === "steem") {
      if (votePercent === 0) {
        await steemVote(
          username,
          author,
          permlink,
          store.getState().votePower.power
        );
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
      } else if (votePercent > 0) {
        await steemVote(username, author, permlink, 0);

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
  updateValue = async props => {
    const { value } = this.state;
    const { post } = this.props;
    const login = store.getState().login;
    if (login.platform === "steem" && post.platform === "steem") {
      const vote = await getVoteWorth();
      this.setState({
        value:
          props > 0
            ? Number(value) - Number(vote)
            : Number(value) + Number(vote)
      });
    }
  };
  render() {
    const { post, username, votePercent } = this.props;
    const { value, shouldOpenComments } = this.state;

    return (
      <FooterActionsContainer>
        <FooterItem>
          {post.platform === "steem" ? (
            <FooterItem>
              <span>${Number(value).toFixed(2) + " "}</span>
              <span>Posted</span>
              <span>
                <FormattedRelative value={post.created + "Z"} />
              </span>
            </FooterItem>
          ) : (
            <Actions>{countActions(post)}</Actions>
          )}
          <FooterItem>
            {this.state.allowEdit && <EditPost post={post} />}
            <ShareMenu postAuthor={post.author} postPermlink={post.permlink} />
            {post.platform === "steem" && (
              <Reblog permlink={post.permlink} post={post} />
            )}
            <Icon
              icon={ic_message}
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.setState({
                  shouldOpenComments: !shouldOpenComments
                })
              }
            />
            <UpvoteButton
              platform={post.platform}
              upvotes={post.upvotes}
              activeVotes={post.active_votes}
              votePercent={votePercent}
              permlink={post.permlink}
              author={post.author}
              updateValue={this.updateValue}
              location={"blog"}
            />
          </FooterItem>
        </FooterItem>
        {shouldOpenComments && (
          <CommentsContainer
            likesNumber={post.net_votes}
            postAuthor={post.author}
            postPermlink={post.permlink}
            postPlatform={post.platform}
            username={username}
            children={post.children}
            post={post}
          />
        )}
      </FooterActionsContainer>
    );
  }
}
FooterActions.propTypes = {
  post: PropTypes.object,
  username: PropTypes.string,
  votePercent: PropTypes.number
};
