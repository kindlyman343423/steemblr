import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import {
  Container,
  CardHeader,
  CardAvatar,
  ReblogHeader,
  CardTitle,
  UsernameContainer
} from "./Post.styles";
import CardContent from "../../Components/Post/CardContent";
import NSFWOverlay from "../../Components/Post/NSFWOverlay";
import Icon from "react-icons-kit";
import { ic_repeat } from "react-icons-kit/md/ic_repeat";
import { injectIntl } from "react-intl";
import CardFooter from "./Footer/";
import { connect } from "react-redux";
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockupImg: "",
      username: this.props.username,
      votePercent: this.props.voteStatus.percent,
      value: 0,
      allowEdit: this.props.post.author === this.props.username,
      shouldOpenComments: false
    };

    this.setState({
      username: this.props.username
    });
  }
  handleNSFWOverlay = () => {
    const { login, userSettings, post } = this.props;
    if (userSettings.isNSFWAllowed) {
      return void 0;
    } else if (post.isNSFW && userSettings.isNSFWAllowed === false) {
      return <NSFWOverlay login={login} />;
    }
  };
  render() {
    const { post } = this.props;
    const { username, votePercent } = this.state;
    return (
      <Container>
        {this.handleNSFWOverlay()}
        {post.is_reblogged && (
          <ReblogHeader>
            <CardTitle>
              <UsernameContainer>
                {post.is_reblogged && (
                  <span>
                    <Icon icon={ic_repeat} size={20} />
                    <b>
                      <Link
                        to={`/post/@${post.reblogged_post.author}/${
                          post.reblogged_post.permlink
                        }`}
                      >
                        {post.reblogged_post.author}
                      </Link>
                    </b>
                  </span>
                )}
              </UsernameContainer>
            </CardTitle>
          </ReblogHeader>
        )}
        {post.is_reblogged && (
          <CardContent
            post={post.reblogged_post}
            isReblogged={true}
            post_type={post.reblogged_post.post_type}
            section={"home"}
            text={
              post.reblogged_post.steemblr_body === undefined
                ? post.reblogged_post.body
                : post.reblogged_post.steemblr_body
            }
            json_metadata={post.reblogged_post.json_metadata}
          />
        )}
        {post.is_reblogged && (
          <CardHeader>
            <Link to={`/post/@${post.author}/${post.permlink}`} target="_blank">
              <CardAvatar
                url={`https://steemitimages.com/u/${post.author}/avatar`}
              />
            </Link>

            <CardTitle>
              <UsernameContainer>
                <span>
                  <b>{post.author}</b>
                </span>
              </UsernameContainer>
            </CardTitle>
          </CardHeader>
        )}

        <CardContent
          post={post}
          isReblogged={false}
          section={"home"}
          text={
            post.steemblr_body === undefined ? post.body : post.steemblr_body
          }
          post_type={post.post_type}
          json_metadata={post.json_metadata}
        />
        <CardFooter post={post} username={username} votePercent={votePercent} />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  login: state.login,
  userSettings: state.userSettings
});
export default connect(mapStateToProps, {})(hot(module)(injectIntl(Post)));
