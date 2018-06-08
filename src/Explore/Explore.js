import React, { Component } from "react";
import HeaderTabs from "./HeaderTabs";
import PostLoader from "./PostLoader";
import { Route, Redirect } from "react-router-dom";
import "./Explore.css";
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
          <Header login={this.props.login} />
          <HeaderTabs match={this.props.match} />
        </HeaderContainer>;
        <Redirect to="/explore/trending" />
        <Route
          path={`${this.props.match.url}`}
          render={props => (
            <PostLoader
              key={this.props.location.key}
              {...props}
              category={this.props.location.pathname.replace("/explore/", "")}
            />
          )}
        />
      </Container>
    );
  }
}
/* */
