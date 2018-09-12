import React, { Component } from "react";
import HeaderTabs from "./HeaderTabs";
import PostsLoader from "./PostsLoader";
import { Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";
import colors from "../styles/colors";
const Container = styled.div``;
const HeaderContainer = styled.div`
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: fixed;
  top: 0;
`;
export default class Explore extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header />
          <HeaderTabs match={this.props.match} />
        </HeaderContainer>
        {this.props.location.pathname === "/explore" ? (
          <Redirect to="/explore/new" />
        ) : (
          void 0
        )}
        <Route
          path={`/explore/:category`}
          render={props => (
            <PostsLoader key={this.props.location.key} {...props} />
          )}
        />
      </Container>
    );
  }
}
/* */
