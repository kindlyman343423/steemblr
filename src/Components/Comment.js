import React, { Component } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const Paragraph = styled.p`
  color: black;
  word-wrap: break-word;
`;

export default class Comment extends Component {
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
      <Paragraph>
        <Nickname onClick={this.handleClick}>{this.props.author}</Nickname>:
        <span>{ReactHtmlParser(this.props.body)}</span>
      </Paragraph>
    );
  }
}
