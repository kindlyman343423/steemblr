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
  Avatar2,
  CardTitle,
  BtnContainer,
  CardFooter,
  TagContainer,
  FooterActions
} from "./Post.styles";

import FollowBtn from "./FollowBtn";
import Lightbox from "react-image-lightbox";

//ICONS

import LazyLoad from "react-lazyload";
import followSteem from "../.././Functions/followSteem";
import Comments from "./Comments";
import PostCardText from "./PostCardText";
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
      shouldOpenComments: false,
      isOpen: false,
      isFollowing: this.props.isFollowing,
      votePercent: this.props.voteStatus.percent
    };

    this.setState({
      username: this.props.username
    });

    this.handleFollowBtn = this.handleFollowBtn.bind(this);
    this.handleVoteBtn = this.handleVoteBtn.bind(this);
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

  render() {
    const heartIconStyle = {
      cursor: "pointer",
      color: this.props.voteStatus.percent > 0 ? "red" : "black"
    };
    return (
      <LazyLoad height={600}>
        <Container>
          <CardHeader>
            <CardAvatar>
              <Avatar2
                src={`https://steemitimages.com/u/${
                  this.props.post.author
                }/avatar`}
                alt="avatar"
              />
            </CardAvatar>
            <CardTitle>
              <b>{this.props.post.author}</b>
              <p>{this.props.post.title}</p>
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
