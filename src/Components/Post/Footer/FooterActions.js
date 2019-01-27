import React, { Component } from "react";
import ShareMenu from "./ShareMenu";
import Reblog from "./Reblog";
import CommentsModal from "./CommentsModal";
import { FooterActionsContainer } from "../Post.styles";
import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import EditPost from "./EditPost";
import checkValueState from "Functions/checkValueState";
import store from "../../../store";
import getVoteWorth from "Functions/getVoteWorth";
import PropTypes from "prop-types";
import styled from "styled-components";
import UpvoteButton from "./UpvoteButton";

const Actions = styled.span`
  display: flex;
  align-items: center;
`;
export default class FooterActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      weight: 0,
      userPlatform: store.getState().login.platform,
      allowEdit: false,
      actions: 0
    };
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
  handleValue() {
    //checking value of the post
    const { post } = this.props;
    this.setState({
      value: checkValueState([
        post.total_payout_value.replace("SBD", ""),
        post.pending_payout_value.replace("SBD", ""),
        post.total_pending_payout_value.replace("STEEM", ""),
        post.curator_payout_value.replace("SBD", "")
      ])
    });
  }
  updateValue = async props => {
    const { value, actions } = this.state;
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
    this.setState({
      actions: props > 0 ? actions + 1 : actions - 1
    });
  };
  render() {
    const { post, username, votePercent } = this.props;
    const { value } = this.state;

    return (
      <FooterActionsContainer>
        {post.platform === "steem" ? (
          <span>${Number(value).toFixed(2)}</span>
        ) : (
          <Actions>{post.actions}</Actions>
        )}
        <span>
          {this.state.allowEdit && <EditPost post={post} />}
          <ShareMenu postAuthor={post.author} postPermlink={post.permlink} />
          {post.platform === "steem" && (
            <Reblog permlink={post.permlink} post={post} />
          )}
          {this.state.shouldOpenComments ? (
            <CommentsModal
              likesNumber={post.net_votes}
              postAuthor={post.author}
              postPermlink={post.permlink}
              postPlatform={post.platform}
              username={username}
              children={post.children}
              post={post}
            />
          ) : (
            <Icon
              icon={ic_message}
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() =>
                this.setState({
                  shouldOpenComments: true
                })
              }
            />
          )}
          <UpvoteButton
            platform={post.platform}
            upvotes={post.upvotes}
            activeVotes={post.active_votes}
            votePercent={votePercent}
            permlink={post.permlink}
            author={post.author}
            updateValue={this.updateValue}
          />
        </span>
      </FooterActionsContainer>
    );
  }
}
FooterActions.propTypes = {
  post: PropTypes.object,
  username: PropTypes.string,
  votePercent: PropTypes.number
};
