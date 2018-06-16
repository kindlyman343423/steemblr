import React, { Component } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import Menu from "./Menu";
import OptionLoader from "./OptionLoader";

const Container = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: 60% auto;
  grid-column-gap: 25px;
  border-radius: 40px;
  @media (max-width: 425px) {
    grid-template-columns: 70% auto;
    grid-column-gap: 5px;
  }
`;
export default class Settings extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container>
          <OptionLoader option={this.props.match.params.option} />
          <Menu />
        </Container>
      </div>
    );
  }
}
