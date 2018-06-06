import React, { Component } from "react";
import { hot } from "react-hot-loader";
import ReactHtmlParser from "react-html-parser";
import Remarkable from "remarkable";
import { Link } from "react-router-dom";
import {
  tagStyles,
  Container,
  CardHeader,
  CardAvatar,
  CardTitle,
  BtnContainer,
  CardFooter,
  TagContainer,
  FooterActions
} from "./Post.styles";
import delay from "../../Functions/delay";
import FollowBtn from "./FollowBtn";
import Lightbox from "react-image-lightbox";
import HoverIntet from "react-hoverintent";
import LazyLoad from "react-lazyload";
import followSteem from "../.././Functions/followSteem";
import Comments from "./Comments";
import PostCardText from "./PostCardText";
import ProfileHover from "./ProfileHover";

import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import store from "../../store";

const md = new Remarkable({
  html: true,
  linkify: true
});

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
      isFollowing: this.props.isFollowing,
      votePercent: this.props.voteStatus.percent
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
    this.props.handleVoting(
      this.props.username,
      this.props.post.author,
      this.props.post.permlink,
      this.state.votePercent
    );
    await this.setState({
      votePercent: store.getState().votePower.power
    });
  }
  //Handling Mouse Events
  handleMouseEvent(e) {
    e.persist();
    this.debouncedMouseOver(e);
  }
  handleProfileHover() {
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
  async handleProfileUsernameHover() {
    await delay(500);
    if (this.state.isOverDivHover) {
      return void 0;
    } else {
      this.setState({
        isHover: false
      });
    }
  }
  render() {
    console.log(
      "isHover:" + this.state.isHover,
      "isOverDiv:" + this.state.isOverDivHover
    );
    const heartIconStyle = {
      cursor: "pointer",
      color: this.props.voteStatus.percent > 0 ? "red" : "black"
    };
    return (
      <LazyLoad height={600}>
        <Container>
          <CardHeader>
            <CardAvatar
              url={`https://steemitimages.com/u/${
                this.props.post.author
              }/avatar`}
            />
            <CardTitle>
              <HoverIntet
                onMouseOver={this.handleProfileHover}
                onMouseOut={this.handleProfileUsernameHover}
                sensitivity={10}
                interval={300}
                timeout={250}
              >
                <b>{this.props.post.author}</b>
              </HoverIntet>
              <p>{this.props.post.title}</p>
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
          <PostCardText
            text={ReactHtmlParser(md.render(this.props.post.body))}
          />
          <CardFooter>
            <TagContainer>
              {JSON.parse(this.props.post.json_metadata).tags === undefined
                ? "true"
                : JSON.parse(this.props.post.json_metadata).tags.map(tag => {
                    return (
                      <Link style={tagStyles} to={`/search/tag/?${tag}`}>
                        #{tag}
                      </Link>
                    );
                  })}
            </TagContainer>
            <FooterActions>
              <span>
                {"$" +
                  Number(
                    this.props.post.pending_payout_value.replace("SBD", "")
                  ).toFixed(2)}{" "}
              </span>
              <span>
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
