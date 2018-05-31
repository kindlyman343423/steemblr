import React, { Component } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import Remarkable from "remarkable";

import { Avatar, MuiThemeProvider } from "material-ui";
import {
  AvatarStyles,
  cardHeaderStyle,
  cardActionStyles,
  sbdCounter
} from "./Post.styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardText
} from "material-ui/Card";
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

const md = new Remarkable({
  html: true,
  linkify: true
});
const Img = styled.img`
  cursor: zoom-in;
`;
const Container = styled.div`
  background-color: white;
  margin-bottom: 20px;
  padding: 0px !important;
  border-radius: 1%;
  text-align: left;
  overflow: hidden;
  svg {
    padding-right: 10px;
  }
  img {
    max-width: 100%;
    height: auto;
    overflow: hidden;
  }
  iframe {
    max-width: 100%;
    min-height: 300px;
  }
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;
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
  }

  handleFollowBtn() {
    followSteem(this.props.username, this.props.post.author);
    this.setState({
      isFollowing: true
    });
  }

  render() {
    const HeartIconStyle = {
      color: this.props.voteStatus.percent > 0 ? "red" : "black"
    };
    return (
      <LazyLoad height={600}>
        <MuiThemeProvider>
          <Container>
            <Card>
              <CardHeader
                titleStyle={cardHeaderStyle}
                title={this.props.post.author}
                subtitle={this.props.post.title}
                avatar={
                  <Avatar
                    size={this.state.innerWidth > 425 ? 32 : 24}
                    src={`https://steemitimages.com/u/${
                      this.props.post.author
                    }/avatar`}
                    style={AvatarStyles}
                  />
                }
                children={
                  this.state.isFollowing ? (
                    ""
                  ) : (
                    <FollowBtn
                      onClick={this.handleFollowBtn}
                      innerWidth={this.state.innerWidth}
                      componentLocation={this.props.componentLocation}
                    >
                      Follow
                    </FollowBtn>
                  )
                }
              />

              {this.props.type === "photo" ? (
                <CardMedia>
                  <Img
                    alt=""
                    onClick={() => {
                      this.setState({ isOpen: true });
                    }}
                  />
                  {this.state.isOpen && (
                    <Lightbox
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </CardMedia>
              ) : (
                void 0
              )}

              <PostCardText
                text={ReactHtmlParser(md.render(this.props.post.body))}
              />

              <CardActions style={{ backgroundColor: "#FFF" }}>
                <CardText style={cardActionStyles}>
                  <span style={sbdCounter}>
                    {"$" +
                      Number(
                        this.props.post.pending_payout_value.replace("SBD", "")
                      ).toFixed(2)}{" "}
                  </span>
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
                    color="red"
                    onClick={() =>
                      this.props.handleVoting(
                        this.props.username,
                        this.props.post.author,
                        this.props.post.permlink,
                        this.state.votePercent
                      )
                    }
                    style={HeartIconStyle}
                  />
                </CardText>
              </CardActions>
            </Card>
          </Container>
        </MuiThemeProvider>
      </LazyLoad>
    );
  }
}
export default hot(module)(Post);
