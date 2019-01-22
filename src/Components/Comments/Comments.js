import React, { Component } from "react";

import Spinner from ".././Spinner";
import Comment from "./Comment";
import getContentReplies from "../.././Functions/getContentReplies";
import sendComment from "Functions/Steem/sendComment";
import sendCommentFirebase from "Functions/Firebase/sendComment";
import uuidv4 from "uuid/v4";
import delay from "../../Functions/delay";
import steemVote from "../.././Functions/Steem/steemVote";
import { hot } from "react-hot-loader";
import store from "../../store";
import updatePost, { updatePostByAuthor } from "actions/updatePost";
import {
  postVoteToState,
  removeVoteFromState
} from "../../actions/stateActions";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      comment: "",
      votedComments: [],
      votesToPush: [],
      votesToRemove: [],
      isLoading: true,
      innerWidth: window.innerWidth,
      username: store.getState().login.username,
      showInput: false,
      firebaseComments: []
    };

    this.handleSendComment = this.handleSendComment.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.updateVotingState = this.updateVotingState.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.firebaseComments !== prevProps.firebaseComments) {
      this.setState({
        firebaseComments: this.props.firebaseComments
      });
    }
  }
  async componentWillMount() {
    const apiCall = await getContentReplies(
      this.props.postAuthor,
      this.props.postPermlink
    );
    this.setState({
      comments: apiCall[0],
      firebaseComments: this.props.firebaseComments,
      votedComments: await store.getState().steemProfileVotes.votes,
      isLoading: false
    });
  }

  async updateComments(props) {
    const {
      postAuthor,
      postPermlink,
      origin,
      inReply,
      replyTo,
      comLocation
    } = this.props;
    if (props === "steem") {
      await delay(3000);
      const apiCall = await getContentReplies(postAuthor, postPermlink);
      this.setState({
        comments: apiCall[0]
      });
    } else if (props === "email") {
      //if component is not located in blog it uses different redux action
      // to read comments
      if (comLocation === "main") {
        await store.dispatch(updatePost(origin));
        const post = store.getState().steemPosts.posts.filter(post => {
          return post.permlink === origin;
        });
        this.setState({
          firebaseComments: post[0].comments
        });
      } else if (comLocation === "blog") {
        await store.dispatch(updatePostByAuthor(origin));
        const post = store.getState().steemPostsByAuthor.posts.filter(post => {
          return post.permlink === origin;
        });
        this.setState({
          firebaseComments: post[0].comments
        });
      }
    }
  }
  async handleSendComment(author, permlink, comment, replyTo) {
    console.log(author, permlink, comment, replyTo);
    const { postPlatform } = this.props;
    const login = store.getState().login;
    const commentToSend = {
      permlink: permlink,
      comment: comment,
      username: login.username,
      platform: login.platform,
      isReply: true,
      replyTo: replyTo,
      token: login.token
    };
    if (login.status && login.platform === "steem") {
      if (postPlatform === "steem") {
        sendComment(author, permlink, this.state.username, comment, uuidv4());
        this.setState({
          comment: ""
        });
        this.updateComments("steem");
      } else if (postPlatform === "email") {
        sendCommentFirebase(commentToSend);
        this.updateComments("email");
        this.setState({
          comment: ""
        });
      }
    } else if (login.status && login.platform === "email") {
      sendCommentFirebase(commentToSend);
      this.updateComments("email");
      this.setState({
        comment: ""
      });
    } else {
      alert("You have to login first");
    }
  }
  handleInputChange(e) {
    const target = e.target;
    let value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleVoting(username, author, permlink, votePercent) {
    const login = store.getState().login.status;
    if (login) {
      const votePower = store.getState().votePower.power;
      if (votePercent === 0 || votePercent === undefined) {
        await steemVote(username, author, permlink, votePower);
        const state = this.state.votedComments;
        const newItem = [
          {
            permlink: author + "/" + permlink,
            percent: votePower
          }
        ];
        let newState = [];
        await this.setState({
          votedComments: newState.concat(state, newItem),

          votesToPush: this.state.votesToPush.concat(newItem)
        });
      } else if (votePercent > 0) {
        await steemVote(username, author, permlink, 0);

        const state = this.state.votedComments;
        const fullPermlink = author + "/" + permlink;
        let newState = state.filter(item => {
          return item.permlink !== fullPermlink;
        });
        const newItem = [
          {
            permlink: fullPermlink,
            percent: votePercent
          }
        ];
        this.setState({
          votedComments: newState,
          votesToRemove: this.state.votesToRemove.concat(newItem)
        });
      }
    } else {
      alert("You have to login first");
    }
  }
  async updateVotingState(props, action) {
    if (action === true) {
      store.dispatch(postVoteToState(props));
    } else if (action === false) {
      store.dispatch(removeVoteFromState(props));
    }
  }
  checkVoteStatus(props) {
    const find = this.state.votedComments.find(o => o.permlink === props);

    if (find) {
      return {
        status: true,
        percent: find.percent
      };
    } else {
      return {
        status: false,
        percent: 0
      };
    }
  }

  render() {
    const {
      postPlatform,
      postPermlink,
      inReply,
      replyTo,
      comLocation
    } = this.props;
    const { firebaseComments, comments, isLoading } = this.state;

    return (
      <span>
        {comments.length === 0 &&
        firebaseComments.length === 0 &&
        isLoading === false ? (
          <p>No comments yet :(</p>
        ) : (
          void 0
        )}
        {isLoading && <Spinner marginTop="2" />}
        {postPlatform === "steem" &&
          comments.map(comment => {
            return (
              <Comment
                postPermlink={postPermlink}
                platform="steem"
                handleSendComment={this.handleSendComment}
                comment={comment}
                author={comment.author}
                body={comment.body}
                key={comment.id}
                replies={comment.replies}
                handleVoting={this.handleVoting}
                username={this.state.username}
                permlink={comment.permlink}
                fullPermlink={comment.author + "/" + comment.permlink}
                voteStatus={this.checkVoteStatus(
                  comment.author + "/" + comment.permlink
                )}
                comLocation={comLocation}
              />
            );
          })}
        {firebaseComments !== undefined &&
          firebaseComments
            .sort((a, b) => {
              return a.timestamp - b.timestamp;
            })
            .map(comment => {
              if (inReply === false && comment.isReply === false) {
                return (
                  <Comment
                    postPermlink={postPermlink}
                    firebaseComments={
                      firebaseComments !== undefined ? firebaseComments : []
                    }
                    platform="email"
                    handleSendComment={this.handleSendComment}
                    comment={comment}
                    author={comment.author}
                    body={comment.body}
                    key={comment.id}
                    handleVoting={this.handleVoting}
                    username={this.state.username}
                    permlink={comment.permlink}
                    fullPermlink={comment.author + "/" + comment.permlink}
                    voteStatus={this.checkVoteStatus(
                      comment.author + "/" + comment.permlink
                    )}
                    origin={this.props.origin}
                    comLocation={comLocation}
                  />
                );
              } else if (
                inReply === true &&
                comment.isReply === true &&
                comment.replyTo === replyTo
              ) {
                return (
                  <Comment
                    postPermlink={postPermlink}
                    firebaseComments={firebaseComments}
                    platform="email"
                    handleSendComment={this.handleSendComment}
                    comment={comment}
                    author={comment.author}
                    body={comment.body}
                    key={comment.id}
                    handleVoting={this.handleVoting}
                    username={this.state.username}
                    permlink={comment.permlink}
                    fullPermlink={comment.author + "/" + comment.permlink}
                    voteStatus={this.checkVoteStatus(
                      comment.author + "/" + comment.permlink
                    )}
                    origin={this.props.origin}
                    inReply={true}
                    comLocation={comLocation}
                  />
                );
              }
            })}
      </span>
    );
  }
}

export default hot(module)(Comments);
