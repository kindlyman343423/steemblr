import React, { Component } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Blog from "../Blog/";
import SwitchBtn from "./SwitchBtn";
import { Redirect } from "react-router-dom";
import store from "../store";
const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 25% auto;
  @media (max-width: 1024px) {
    grid-template-columns: 30% auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: 45% auto;
  }
  @media (max-width: 425px) {
    grid-template-columns: ${props => props.mobileGrid}% auto;
  }
`;
const BlogContainer = styled.div`
  display: block;
  overflow-y: scroll;
  max-height: 100vh;
`;
export default class EditTheme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileGrid: 100
    };
  }

  handleViewSwitch = () => {
    if (this.state.mobileGrid === 100) {
      console.log("100 grid", this.state.mobileGrid);
      this.setState({
        mobileGrid: 0
      });
    } else if (this.state.mobileGrid === 0) {
      console.log(this.state.mobileGrid);
      this.setState({
        mobileGrid: 100
      });
    }
  };
  render() {
    return (
      <Container mobileGrid={this.state.mobileGrid}>
        {store.getState().login.status === false ? <Redirect to="/" /> : void 0}
        <Menu />
        <BlogContainer>
          <Blog {...this.props} />
        </BlogContainer>
        <SwitchBtn handleViewSwitch={this.handleViewSwitch} />
      </Container>
    );
  }
}
