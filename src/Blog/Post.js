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
import FollowBtn from "./FollowBtn";
import Lightbox from "react-image-lightbox";

import followSteem from "../Functions/followSteem";
import PostCardText from "./PostCardText";

import Icon from "react-icons-kit";
import { ic_message } from "react-icons-kit/md/ic_message";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import store from "../store";
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
      isBlogModalOpen: false
    };

    this.setState({
      username: this.props.username
    });

    this.handleFollowBtn = this.handleFollowBtn.bind(this);
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

  render() {
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
          </FooterActions>
        </CardFooter>
      </Container>
    );
  }
}
export default hot(module)(Post);
