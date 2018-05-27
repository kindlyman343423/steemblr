import React, { Component } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import Remarkable from "remarkable";
import { hot } from "react-hot-loader";
const Container = styled.div`
  color: black;
  background-color: white;
  margin-bottom: 10px;
  word-wrap: break-word;
  box-sizing: border-box;
`;
const md = new Remarkable({
  html: true,
  linkify: true
});
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      percent: 0
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
      this.state.percent
    );
    this.setState({
      status: !this.state.status,
      percent: this.state.status === true ? 1 : 0
    });
  }
  render() {
    const Nickname = styled.span`
      font-weight: 500;
      color: ${this.state.percent > 0 ? "red" : "black"};
      cursor: pointer;
    `;
    return (
      <Container>
        <Nickname onClick={this.handleClick}>{this.props.author}</Nickname>:
        {ReactHtmlParser(md.render(this.props.body))}
      </Container>
    );
  }
}
export default hot(module)(Comment);
