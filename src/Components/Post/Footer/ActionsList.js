import React, { Component } from "react";
import styled from "styled-components";
import ActionsListElement from "./ActionsListElement";
import ActionsListElementSteem from "./ActionsListElementSteem";
import PropTypes from "prop-types";
import ErrorBoundary from "Components/ErrorBoundary";
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ActionBtn = styled.button`
  color: #fff;
  background-color: #06162b;
  width: 100%;
  border: 0;
  cursor: pointer;
  height: 40px;
  outline: none;
  &:hover {
    background-color: #263238;
  }
`;
const List = styled.ul`
  list-style-type: none;
  padding-inline-start: 10px;
  max-height: 300px;
  overflow-y: auto;
`;
export default class ActionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [],
      platformToShow: "steemblr"
    };
  }
  componentDidMount() {
    const { post } = this.props;
    try {
      const actions = []
        .concat(post.comments, post.upvotes)
        .sort((a, b) => b.timestamp - a.timestamp);
      this.setState({
        actions: actions
      });
    } catch (err) {
      console.error(err);
    }
  }
  handleActions = () => {
    const { post } = this.props;
    const { platformToShow, actions } = this.state;
    if (platformToShow === "steem" && post.platform === "steem") {
      if (post.active_votes === 0) {
        return "Empty";
      }
      return post.active_votes.map(action => {
        action.action = "upvote";
        action.username = action.voter;
        action.platform = "steem";
        return <ActionsListElementSteem key={action.voter} data={action} />;
      });
    } else if (platformToShow === "steemblr") {
      if (actions.length === 0) {
        return "Empty";
      }
      return actions.map(action => {
        return <ActionsListElement key={action.timestamp} data={action} />;
      });
    }
  };
  handleActionBtn = props => {
    this.setState({
      platformToShow: props
    });
  };
  render() {
    const { post } = this.props;
    return (
      <div>
        <Nav>
          <ActionBtn onClick={() => this.handleActionBtn("steemblr")}>
            steemblr
          </ActionBtn>
          {post.platform === "steem" && (
            <ActionBtn onClick={() => this.handleActionBtn("steem")}>
              steem
            </ActionBtn>
          )}
        </Nav>
        <ErrorBoundary>
          <List>{this.handleActions()}</List>
        </ErrorBoundary>
      </div>
    );
  }
}

ActionsList.propTypes = {
  post: PropTypes.object
};
