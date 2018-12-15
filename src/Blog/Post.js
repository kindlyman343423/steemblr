import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import {
  tagStyles,
  Container,
  CardFooter,
  TagContainer,
  FooterActions,
  CardHeader,
  CardAvatar,
  ReblogHeader,
  CardTitle,
  UsernameContainer
} from "./Post.styles";
import checkValueState from "../Functions/checkValueState";
import getVoteWorth from "../Functions/getVoteWorth";
import CommentsContainer from "./CommentsContainer";
import Reblog from "../Components/Post/Reblog";
import CardContent from "../Components/Post/CardContent";
import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_repeat } from "react-icons-kit/md/ic_repeat";
import store from "../store";
import { injectIntl } from "react-intl";
import { FormattedRelative } from "react-intl";
import ShareMenu from "../Components/Post/ShareMenu";
import EditPost from "../Components/Post/EditPost";
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockupImg: "",
      username: this.props.username,
      shouldOpenComments: false,
      votePercent: this.props.voteStatus.percent,
      value: checkValueState([
        this.props.post.total_payout_value.replace("SBD", ""),
        this.props.post.pending_payout_value.replace("SBD", ""),
        this.props.post.total_pending_payout_value.replace("STEEM", ""),
        this.props.post.curator_payout_value.replace("SBD", "")
      ]),
      allowEdit: this.props.post.author === this.props.username
    };

    this.setState({
      username: this.props.username
    });

    this.handleVoteBtn = this.handleVoteBtn.bind(this);
  }
  async handleVoteBtn() {
    const login = store.getState().login.status;
    if (login) {
      this.props.handleVoting(
        this.props.username,
        this.props.post.author,
        this.props.post.permlink,
        this.state.votePercent
      );
      const vote = await getVoteWorth();

      await this.setState({
        votePercent: store.getState().votePower.power,
        value:
          this.state.votePercent > 0
            ? Number(this.state.value) - Number(vote)
            : Number(this.state.value) + Number(vote)
      });
    } else {
      alert("You have to login first");
    }
  }
  render() {
    const heartIconStyle = {
      cursor: "pointer",
      color: this.props.voteStatus.percent > 0 ? "red" : "black"
    };
    return (
      <Container>
        {this.props.post.is_reblogged && (
          <ReblogHeader>
            <CardTitle>
              <UsernameContainer>
                {this.props.post.is_reblogged && (
                  <span>
                    <Icon icon={ic_repeat} size={20} />
                    <b>
                      <Link
                        to={`/post/@${this.props.post.reblogged_post.author}/${
                          this.props.post.reblogged_post.permlink
                        }`}
                      >
                        {this.props.post.reblogged_post.author}
                      </Link>
                    </b>
                  </span>
                )}
              </UsernameContainer>
            </CardTitle>
          </ReblogHeader>
        )}
        {this.props.post.is_reblogged && (
          <CardContent
            isReblogged={true}
            post_type={this.props.post.reblogged_post.post_type}
            section={"home"}
            text={
              this.props.post.reblogged_post.steemblr_body === undefined
                ? this.props.post.reblogged_post.body
                : this.props.post.reblogged_post.steemblr_body
            }
            json_metadata={this.props.post.reblogged_post.json_metadata}
          />
        )}
        {this.props.post.is_reblogged && (
          <CardHeader>
            <Link
              to={`/post/@${this.props.post.author}/${
                this.props.post.permlink
              }`}
              target="_blank"
            >
              <CardAvatar
                url={`https://steemitimages.com/u/${
                  this.props.post.author
                }/avatar`}
              />
            </Link>

            <CardTitle>
              <UsernameContainer>
                <span>
                  <b>{this.props.post.author}</b>
                </span>
              </UsernameContainer>
            </CardTitle>
          </CardHeader>
        )}

        <CardContent
          isReblogged={false}
          section={"home"}
          text={
            this.props.post.steemblr_body === undefined
              ? this.props.post.body
              : this.props.post.steemblr_body
          }
          post_type={this.props.post.post_type}
          json_metadata={this.props.post.json_metadata}
        />

        <CardFooter>
          <TagContainer>
            {this.props.post.tags !== undefined &&
            this.props.post.tags.filter(tag => {
              return tag === this.props.post.category;
            }).length === 0 ? (
              <Link
                key={this.props.post.category}
                style={tagStyles}
                to={`/search/${this.props.post.category}/new`}
              >
                #{this.props.post.category}
              </Link>
            ) : (
              void 0
            )}
            {this.props.post.tags === undefined
              ? "true"
              : this.props.post.tags.map(tag => {
                  return (
                    <Link key={tag} style={tagStyles} to={`/search/${tag}/new`}>
                      #{tag}
                    </Link>
                  );
                })}
          </TagContainer>
          <FooterActions>
            <span>${Number(this.state.value).toFixed(2)}</span>
            <span>
              {this.state.allowEdit && <EditPost post={this.props.post} />}
              <ShareMenu
                postAuthor={this.props.post.author}
                postPermlink={this.props.post.permlink}
              />
              {
                <Icon
                  icon={ic_message}
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({
                      shouldOpenComments: !this.state.shouldOpenComments
                    })
                  }
                />
              }
              <Reblog
                permlink={this.props.post.permlink}
                post={this.props.post}
              />
              <Icon
                size={20}
                icon={ic_favorite}
                style={heartIconStyle}
                onClick={this.handleVoteBtn}
              />
            </span>
          </FooterActions>
          <FormattedRelative
            {...this.props}
            value={this.props.post.created + "Z"}
          />
        </CardFooter>
        {this.state.shouldOpenComments ? (
          <CommentsContainer
            children={this.props.post.children}
            likesNumber={this.props.post.net_votes}
            postAuthor={this.props.post.author}
            postPermlink={this.props.post.permlink}
          />
        ) : (
          void 0
        )}
      </Container>
    );
  }
}
export default hot(module)(injectIntl(Post));
