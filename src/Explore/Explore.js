import React, { Component } from "react";
import HeaderTabs from "./HeaderTabs";
import Trending from "./Trending";
import { Route } from "react-router-dom";
import "./Explore.css";
import styled from "styled-components";
import Header from "../Header/Header";
import colors from "../styles/colors";
const Container = styled.div``;
const HeaderContainer = styled.div`
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
        </HeaderContainer>
        <Route
          path={`${this.props.match.url}/trending`}
          render={props => (
            <Trending
              {...props}
              following={this.props.following}
              username={this.props.username}
            />
          )}
        />
      </Container>
    );
  }
}
