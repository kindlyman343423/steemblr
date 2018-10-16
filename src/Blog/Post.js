import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import {
  tagStyles,
  Container,
  CardFooter,
  TagContainer,
  FooterActions
} from "./Post.styles";
import checkValueState from "../Functions/checkValueState";
import getVoteWorth from "../Functions/getVoteWorth";
import CommentsContainer from "./CommentsContainer";
import CardContent from "./CardContent";
import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
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
        <CardContent
          text={this.props.post.body}
          post_type={this.props.post.post_type}
          json_metadata={this.props.post.json_metadata}
        />

        <CardFooter>
          <TagContainer>
            {JSON.parse(this.props.post.json_metadata).tags !== undefined &&
            JSON.parse(this.props.post.json_metadata).tags.filter(tag => {
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
            {JSON.parse(this.props.post.json_metadata).tags === undefined
              ? "true"
              : JSON.parse(this.props.post.json_metadata).tags.map(tag => {
                  return (
                    <Link
                      key={tag}
                      style={tagStyles}
                      to={`/search/${this.props.post.category}/new`}
                    >
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
