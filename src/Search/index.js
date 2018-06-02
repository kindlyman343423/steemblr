import React, { Component } from "react";
import Header from "../Header/Header";
import HeaderTabs from "./HeaderTabs";
import styled from "styled-components";
import { Route } from "react-router-dom";
import colors from "../styles/colors";
import Test from "./Test";
import PostLoader from "./PostLoader";
const Container = styled.div``;
const HeaderContainer = styled.div`
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: fixed;
  top: 0;
`;
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <HeaderContainer>
          <Header login={this.props.login} />
          <HeaderTabs match={this.props.match.url} />
        </HeaderContainer>;
        <Route
          path={`${this.props.match.url}/tag/`}
          render={props => (
            <PostLoader
              key={this.props.location.key}
              location={this.props.location}
            />
          )}
        />
      </Container>
    );
  }
}
