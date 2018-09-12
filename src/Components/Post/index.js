import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import {
  tagStyles,
  Container,
  CardHeader,
  CardAvatar,
  CardTitle,
  UsernameContainer,
  BtnContainer,
  CardFooter,
  TagContainer,
  FooterActions
} from "./Post.styles";
import Comments from "./Comments";
import CardContent from "./CardContent";
import ProfileHover from "./ProfileHover";
import ShareMenu from "./ShareMenu";
import delay from "../../Functions/delay";
import checkValueState from "../../Functions/checkValueState";
import getVoteWorth from "../../Functions/getVoteWorth";

import FollowBtn from "./FollowBtn";
import HoverIntet from "react-hoverintent";
import LazyLoad from "react-lazyload";
import { FormattedRelative } from "react-intl";
import followSteem from "../.././Functions/followSteem";

import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";

import store from "../../store";
import BlogModal from "../../Blog/BlogModal";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockupImg: "",
      username: this.props.username,
      isHover: false,
      shouldOpenComments: false,
      isOpen: false,
      isOverDivHover: false,
      isBlogModalOpen: false,
      isFollowing: this.props.isFollowing,
      votePercent: this.props.voteStatus.percent,
      value: checkValueState([
        this.props.post.total_payout_value.replace("SBD", ""),
        this.props.post.pending_payout_value.replace("SBD", ""),
        this.props.post.total_pending_payout_value.replace("STEEM", "")
      ])
    };

    this.setState({
      username: this.props.username
    });

    this.handleFollowBtn = this.handleFollowBtn.bind(this);
    this.handleVoteBtn = this.handleVoteBtn.bind(this);
    this.handleProfileHover = this.handleProfileHover.bind(this);
    this.handleProfileUsernameHover = this.handleProfileUsernameHover.bind(
      this
    );
    this.handleProfileDivHover = this.handleProfileDivHover.bind(this);
    this.handleBlogModal = this.handleBlogModal.bind(this);
  }

  handleFollowBtn() {
    const login = store.getState().login.status;
    if (login) {
      followSteem(this.props.username, this.props.post.author);
      this.setState({
        isFollowing: true
      });
    } else {
      alert("You have to login first");
    }
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
  //Handling Mouse Events
  handleProfileHover() {
    if (this.state.isBlogModalOpen) {
      return void 0;
    }
    this.setState({
      isHover: !this.state.isHover,
      isOverDivHover: false
    });
  }
  handleProfileDivHover() {
    this.setState({
      isOverDivHover: true
    });
  }
  //functions on mouse out waits 500ms and then checks if user is hovering over div with blog info
  async handleProfileUsernameHover() {
    await delay(500);
    if (this.state.isBlogModalOpen) {
      return void 0;
    } else if (this.state.isOverDivHover) {
      return void 0;
    } else {
      this.setState({
        isHover: false
      });
    }
  }
  handleBlogModal() {
    this.setState({
      isBlogModalOpen: !this.state.isBlogModalOpen,
      isHover: false,
      isOverHoverDivHover: false
    });
  }

  render() {
    const heartIconStyle = {
      cursor: "pointer",
      color: this.props.voteStatus.percent > 0 ? "red" : "black"
    };
    return (
      <LazyLoad height={600}>
        {this.state.isBlogModalOpen ? (
          <BlogModal
            post={this.props.post}
            isOpen={this.state.isBlogModalOpen}
            handleBlogModal={this.handleBlogModal}
          />
        ) : (
          void 0
        )}
        <Container>
          <CardHeader>
            <CardAvatar
              url={`https://steemitimages.com/u/${
                this.props.post.author
              }/avatar`}
            />
            <CardTitle>
              <UsernameContainer>
                <HoverIntet
                  onMouseOver={this.handleProfileHover}
                  onMouseOut={this.handleProfileUsernameHover}
                  sensitivity={10}
                  interval={600}
                  timeout={250}
                >
                  <b onClick={this.handleBlogModal}>
                    {this.props.post.author}{" "}
                  </b>
                </HoverIntet>
                <FormattedRelative
                  {...this.props}
                  value={this.props.post.created + "Z"}
                />
              </UsernameContainer>

              <p title={this.props.post.title}>{this.props.post.title}</p>
              {this.state.isHover ? (
                <ProfileHover
                  author={this.props.post.author}
                  handleProfileDivHover={this.handleProfileDivHover}
                  handleProfileHover={this.handleProfileHover}
                  isFollowing={this.state.isFollowing}
                  handleFollowBtn={this.handleFollowBtn}
                />
              ) : (
                void 0
              )}
            </CardTitle>

            <BtnContainer>
              {this.state.isFollowing ? (
                ""
              ) : (
                <FollowBtn
                  onClick={this.handleFollowBtn}
                  innerWidth={this.state.innerWidth}
                  componentLocation={this.props.componentLocation}
                >
                  Follow
                </FollowBtn>
              )}
            </BtnContainer>
          </CardHeader>
          <CardContent
            post_type={this.props.post.post_type}
            section={this.props.section}
            text={this.props.post.body}
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
                ? ""
                : JSON.parse(this.props.post.json_metadata).tags.map(tag => {
                    return (
                      <Link
                        key={tag}
                        style={tagStyles}
                        to={`/search/${tag}/new`}
                      >
                        #{tag}
                      </Link>
                    );
                  })}
            </TagContainer>
            <FooterActions>
              <span>${Number(this.state.value).toFixed(2)}</span>
              <span>
                <ShareMenu
                  postAuthor={this.props.post.author}
                  postPermlink={this.props.post.permlink}
                />
                {this.state.shouldOpenComments ? (
                  <Comments
                    likesNumber={this.props.post.net_votes}
                    postAuthor={this.props.post.author}
                    postPermlink={this.props.post.permlink}
                    username={this.props.username}
                  />
                ) : (
                  <Icon
                    icon={ic_message}
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      this.setState({
                        shouldOpenComments: true
                      })
                    }
                  />
                )}
                <Icon
                  size={20}
                  icon={ic_favorite}
                  style={heartIconStyle}
                  onClick={this.handleVoteBtn}
                />
              </span>
            </FooterActions>
          </CardFooter>
        </Container>
      </LazyLoad>
    );
  }
}
export default hot(module)(Post);
