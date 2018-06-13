import React, { Component } from "react";
import { hot } from "react-hot-loader";
import ReactHtmlParser from "react-html-parser";
import Remarkable from "remarkable";
import { Link } from "react-router-dom";
import {
  tagStyles,
  Container,
  CardFooter,
  TagContainer,
  FooterActions
} from "./Post.styles";
import Lightbox from "react-image-lightbox";

import PostCardText from "./PostCardText";
import Comments from "./Comments";

import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import store from "../store";
import {
  FormattedRelative,
} from 'react-intl';
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
      votePercent: this.props.voteStatus.percent
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
      await this.setState({
        votePercent: store.getState().votePower.power
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
        <PostCardText text={ReactHtmlParser(md.render(this.props.post.body))} />
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

            <FormattedRelative value={Date.parse(this.props.post.created)}/>
        </CardFooter>
        {this.state.shouldOpenComments ? (
          <Comments
            likesNumber={this.props.post.net_votes}
            postAuthor={this.props.post.author}
            postPermlink={this.props.post.permlink}
            username={this.props.username}
          />
        ) : (
          void 0
        )}
      </Container>
    );
  }
}
export default hot(module)(Post);
