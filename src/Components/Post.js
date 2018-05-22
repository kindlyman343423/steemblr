import React, { Component } from "react";

import styled from "styled-components";
//import { Blockquote, Box, Card, BackgroundImage, Subhead, Flex, Heading, Banner, Text , ButtonTransparent} from 'rebass'
import { Avatar, MuiThemeProvider } from "material-ui";
import {
  AvatarStyles,
  StyledDiv,
  buttonStyles,
  cardHeaderStyle,
  CardActionStyles,
  sbdCounter
} from "./Post.styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  Toggle
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Lightbox from "react-image-lightbox";
//ICONS
import { MdInsertComment, MdFavorite } from "react-icons/lib/md/";
//import { FaRetweet } from 'react-icons/lib/fa/'

import followSteem from ".././Functions/followSteem";

import Comments from "./Comments";
const Img = styled.img`
  cursor: zoom-in;
`;
export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockupImg: "",
      username: this.props.username,
      shouldOpenComments: false,
      isOpen: false,
      isFollowing: this.props.isFollowing,
      votePercent: this.props.voteStatus.percent
        ? this.props.voteStatus.percent
        : 0
    };
    this.setState({
      username: this.props.username
    });
    this.Container = styled.div`
      background-color: white;
      width: ${this.props.width};
      margin-bottom: 20px;
      padding: 0px !important;
      border-radius: 1%;
      text-align: left;
    `;
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.setState({
      mockupImg: this.randomImage()
    });
  }

  handleClick() {
    followSteem(this.props.username, this.props.post.author);
    this.setState({
      isFollowing: true
    });
    this.props.updateFollowingState(this.props.post.author);
  }
  randomImage() {
    const images = [
      "https://78.media.tumblr.com/9ef7b870f185e381ea2c66d7c4002009/tumblr_p4gx4eeK1a1w0f01do1_500.jpg",
      "https://78.media.tumblr.com/8f5bc451c94d693fbc58efcfc13e8bd3/tumblr_p70s58Mxjx1xp47rro1_500.gif",
      "https://78.media.tumblr.com/63e0df1ce27b9c2ca4e9849424c58e50/tumblr_p6xfsmL0HJ1vhm99go1_500.jpg",
      "https://78.media.tumblr.com/8c556aa1e073bcd38fe1a5607c53cf4c/tumblr_p6m9h9QqXL1x3qi68o1_500.jpg",
      "https://78.media.tumblr.com/6a1f5067d6b32588f96d675a8fdf92e0/tumblr_p70ucdXOfM1v64mxyo1_500.jpg",
      "https://78.media.tumblr.com/8c1c7acb12269cc7250180f44c0e08a1/tumblr_p6urubcyPj1rpszhyo1_500.jpg",
      "https://78.media.tumblr.com/1ca1b313e5d282e7dc207f37a31f0b48/tumblr_p6px58qisQ1xp47rro1_500.gif",
      "https://78.media.tumblr.com/780b15e5f13ed94a778ea369dcc73b9e/tumblr_p70y9xZSbE1uokewpo2_500.jpg",
      "https://78.media.tumblr.com/e5dddce752cf5a1c69401355089c9189/tumblr_p6r52lK25t1vlb8rjo1_500.jpg",
      "https://78.media.tumblr.com/b25372ab32f6dfed4ad10f928ab6ed3d/tumblr_p70670w0Ne1vo76weo1_500.png",
      "https://78.media.tumblr.com/425a60ec01e08ef97cdb3355b8318f7a/tumblr_p6py46NEl11xp47rro1_500.gif",
      "https://78.media.tumblr.com/379546c304cb8abb9b82c90c0c31b96c/tumblr_p5cm028D111x1qvoso1_500.jpg",
      "https://78.media.tumblr.com/ba0857c9dd089c7065a4e32e91b3dc69/tumblr_p6jizvoNB41u03r84o1_500.jpg",
      "https://78.media.tumblr.com/06d1bd36a58bf2813021b9c1b5d9e8da/tumblr_inline_p6werdOchH1rhr1h4_540.png",
      "https://78.media.tumblr.com/ea744e5260008c81c7f1c5bb2fe3aa58/tumblr_p67nu0v5yj1teoi0jo1_500.jpg",
      "https://78.media.tumblr.com/28eb7a94f83aa7366d66520768212846/tumblr_p5muoaJKDc1tulzyuo1_500.png"
    ];
    const randomNumber = Math.floor(Math.random() * images.length);
    return images[randomNumber !== 0 ? randomNumber : randomNumber];
  }
  render() {
    return (
      <MuiThemeProvider>
        <this.Container>
          <Card>
            <CardHeader
              titleStyle={cardHeaderStyle}
              title={this.props.post.author}
              subtitle={this.props.isReblogged ? "Resteemed placeholder" : ""}
              avatar={
                <Avatar
                  size={32}
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
                  <FlatButton style={buttonStyles} onClick={this.handleClick}>
                    Follow
                  </FlatButton>
                )
              }
            />

            <CardMedia>
              <Img
                src={this.state.mockupImg}
                alt=""
                onClick={() => {
                  this.setState({ isOpen: true });
                }}
              />
              {this.state.isOpen && (
                <Lightbox
                  mainSrc={this.state.mockupImg}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
            </CardMedia>

            <CardText>{this.props.post.title}</CardText>
            <CardActions>
              <CardText style={CardActionStyles}>
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
                  <MdInsertComment
                    size={20}
                    onClick={() =>
                      this.setState({
                        shouldOpenComments: true
                      })
                    }
                  />
                )}

                <MdFavorite
                  size={20}
                  onClick={() =>
                    this.props.handleVoting(
                      this.props.username,
                      this.props.post.author,
                      this.props.post.permlink,
                      this.state.votePercent
                    )
                  }
                  color={this.state.votePercent > 0 ? "red" : "black"}
                />
              </CardText>
            </CardActions>
          </Card>
        </this.Container>
      </MuiThemeProvider>
    );
  }
}
