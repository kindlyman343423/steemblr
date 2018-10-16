import React, { Component } from "react";
import styled from "styled-components";
import checkValueState from "../../Functions/checkValueState";
import getVoteWorth from "../../Functions/getVoteWorth";
import ReactHtmlParser from "react-html-parser";
import Remarkable from "remarkable";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import Comments from "./Comments";
const Container = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  color: black;
  background-color: white;
  margin-bottom: 10px;
  word-wrap: break-word;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  img {
    max-width: 100%;
    max-height: auto;
  }
  a {
    color: #000;
  }
`;
const Nickname = styled.span`
  font-weight: 500;
  color: ${props => props.color};
  cursor: pointer;
`;
const RepliesBtn = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  font-weight: 700;
`;
const ReplyBtnsContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const md = new Remarkable({
  html: true,
  linkify: true
});
const RepliesContainer = styled.div`
  margin-left: 5px;
`;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: false,
      status: false,
      percent: 0,
      value: checkValueState([
        this.props.comment.total_payout_value.replace("SBD", ""),
        this.props.comment.pending_payout_value.replace("SBD", ""),
        this.props.comment.total_pending_payout_value.replace("STEEM", ""),
        this.props.comment.curator_payout_value.replace("SBD", "")
      ])
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.setState({
      status: this.props.voteStatus.status,
      percent: this.props.voteStatus.percent
    });
  }
  async handleClick() {
    await this.props.handleVoting(
      this.props.username,
      this.props.author,
      this.props.permlink,
      this.props.voteStatus.percent
    );
    const vote = await getVoteWorth();
    this.setState({
      status: !this.state.status,
      value: this.state.status
        ? Number(this.state.value) - Number(vote)
        : Number(this.state.value) + Number(vote),
      percent: this.state.status === true ? 1 : 0
    });
  }

  handleShowRepliesButton = () => {
    const children = this.props.comment.children;
    if (this.state.showReplies) {
      return (
        <RepliesBtn
          onClick={() =>
            this.setState({
              showReplies: false
            })
          }
        >
          Hide replies
        </RepliesBtn>
      );
    } else {
      switch (children) {
        case 0:
          return void 0;
        case 1:
          return (
            <RepliesBtn
              onClick={() =>
                this.setState({
                  showReplies: true
                })
              }
            >
              Show 1 reply
            </RepliesBtn>
          );
        default:
          return (
            <RepliesBtn
              onClick={() =>
                this.setState({
                  showReplies: true
                })
              }
            >
              Show {this.props.comment.children} replies
            </RepliesBtn>
          );
      }
    }
  };
  render() {
    return (
      <Container>
        <Link to={"/@" + this.props.author}>
          <Nickname>{this.props.author}</Nickname>
        </Link>
        <span
          style={{
            paddingLeft: "5px",
            cursor: "pointer",
            color: this.props.voteStatus.percent > 0 ? "green" : "black"
          }}
          onClick={this.handleClick}
        >
          ${Number(this.state.value).toFixed(2)}
        </span>
        {ReactHtmlParser(md.render(this.props.body))}
        <ReplyBtnsContainer>
          {this.handleShowRepliesButton()}
          <RepliesBtn>Reply</RepliesBtn>
        </ReplyBtnsContainer>
        <RepliesContainer>
          {this.state.showReplies && (
            <Comments
              postAuthor={this.props.author}
              postPermlink={this.props.permlink}
            />
          )}
        </RepliesContainer>
      </Container>
    );
  }
}
export default hot(module)(Comment);
