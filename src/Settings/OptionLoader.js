import React, { Component } from "react";
import styled from "styled-components";
import Account from "./Account";
import Customize from "./Customize";
const Container = styled.div`
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  margin-left: 20%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 25px;
  border-radius: 5px;
  h2 {
    font-weight: 500;
    margin-top: 0;
    text-align: left;
    border-bottom: 1px solid black;
  }
  @media (max-width: 425px) {
    margin-left: 5px;
  }
`;
export default class OptionLoader extends Component {
  constructor(props) {
    super(props);

    this.laodComponent = this.loadComponent.bind(this);
  }
  loadComponent() {
    switch (this.props.option) {
      case "account":
        return <Account />;
      case "customize":
        return <Customize />;
      default:
        return <Account />;
    }
  }
  render() {
    return (
      <Container>
        <h2>{this.props.option}</h2>
        {this.loadComponent()}
      </Container>
    );
  }
}
