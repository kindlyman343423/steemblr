import React, { Component } from "react";
import ShareMenu from "Components/Post/Footer/ShareMenu";
import Reblog from "Components/Post/Footer/Reblog";
import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import EditPost from "Components/Post/Footer/EditPost";
import checkValueState from "Functions/checkValueState";
import store from "../../../store";
import getVoteWorth from "Functions/getVoteWorth";
import PropTypes from "prop-types";
import styled from "styled-components";
import CommentsContainer from "Blog/Post/Footer/CommentsContainer";
import { FooterActionsContainer, FooterItem } from "../Post.styles";
import { FormattedRelative } from "react-intl";
import UpvoteButton from "Components/Post/Footer/UpvoteButton";
import countActions from "Functions/countActions";
import ActionsContainer from "./ActionsContainer";
import ActionBtn from "Components/ActionBtn";
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
      shouldOpenActions: false,
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
  toggleActions = () => {
    this.setState({
      shouldOpenActions: !this.state.shouldOpenActions,
      shouldOpenComments: false
    });
  };
  toggleComments = () => {
    this.setState({
      shouldOpenComments: !this.state.shouldOpenComments,
      shouldOpenActions: false
    });
  };
  render() {
    const { post, username, votePercent } = this.props;
    const { value, shouldOpenComments, shouldOpenActions } = this.state;

    return (
      <FooterActionsContainer>
        <FooterItem>
          {post.platform === "steem" ? (
            <FooterItem>
              <ActionBtn onClick={this.toggleActions}>
                ${Number(value).toFixed(2) + " "}
              </ActionBtn>
              <span>Posted</span>
              <span>
                <FormattedRelative value={post.created + "Z"} />
              </span>
            </FooterItem>
          ) : (
            <ActionBtn onClick={this.toggleActions}>
              {countActions(post)}
            </ActionBtn>
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
              onClick={this.toggleComments}
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
        {shouldOpenActions && (
          <ActionsContainer post={post} steemValue={value} />
        )}
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
