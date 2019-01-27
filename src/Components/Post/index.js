import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import {
  Container,
  CardHeader,
  CardTitle,
  UsernameContainer,
  BtnContainer
} from "./Post.styles";
import CardContent from "./CardContent";
import CardAvatar from "./CardAvatar";
import CardFooter from "./Footer/";
import ProfileHover from "./ProfileHover";

import delay from "../../Functions/delay";

import getVoteWorth from "../../Functions/getVoteWorth";

import FollowBtn from "./FollowBtn";
import HoverIntet from "react-hoverintent";
import LazyLoad from "react-lazyload";
import { FormattedRelative } from "react-intl";
import followSteem from "../.././Functions/followSteem";

import Icon from "react-icons-kit";
import { ic_repeat } from "react-icons-kit/md/ic_repeat";
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
      value: 0,
      allowEdit: this.props.post.author === this.props.username
    };

    this.setState({
      username: this.props.username
    });

    this.handleFollowBtn = this.handleFollowBtn.bind(this);
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
    const { post } = this.props;
    const { username, votePercent } = this.state;

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
            <Link
              to={`/post/@${this.props.post.author}/${
                this.props.post.permlink
              }`}
              target="_blank"
            >
              <CardAvatar platform={post.platform} author={post.author} />
            </Link>
            <CardTitle>
              <UsernameContainer>
                <HoverIntet
                  onMouseOver={this.handleProfileHover}
                  onMouseOut={this.handleProfileUsernameHover}
                  sensitivity={10}
                  interval={600}
                  timeout={250}
                >
                  <b onClick={this.handleBlogModal}>{this.props.post.author}</b>
                </HoverIntet>
                {post.platform === "steem" && (
                  <FormattedRelative
                    {...this.props}
                    value={this.props.post.created + "Z"}
                  />
                )}
              </UsernameContainer>

              <p>
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
                )}{" "}
                {this.props.post.title}
              </p>
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
              {this.state.isFollowing ||
              store.getState().steemProfile.profile.user ===
                this.props.post.author ? (
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
          {this.props.post.is_reblogged && (
            <CardContent
              post={post.reblogged_post}
              isReblogged={true}
              post_type={this.props.post.reblogged_post.post_type}
              section={this.props.section}
              text={
                this.props.post.reblogged_post.steemblr_body === undefined
                  ? this.props.post.reblogged_post.body
                  : this.props.post.reblogged_post.steemblr_body
              }
              json_metadata={this.props.post.reblogged_post.json_metadata}
            />
          )}
          <CardContent
            post={post}
            platform={post.platform}
            isReblogged={false}
            post_type={this.props.post.post_type}
            section={this.props.section}
            text={
              this.props.post.steemblr_body === undefined
                ? this.props.post.body
                : this.props.post.steemblr_body
            }
            json_metadata={this.props.post.json_metadata}
          />

          <CardFooter
            post={post}
            username={username}
            votePercent={votePercent}
          />
        </Container>
      </LazyLoad>
    );
  }
}
export default hot(module)(Post);
