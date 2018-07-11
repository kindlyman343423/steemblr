import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import store from "../store";
import { Link } from "react-router-dom";
const Container = styled.div`
  text-align: left;
  b {
    font-weight: 500;
  }
`;
const Option = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 30% auto;
  p {
    color: ${colors.font.normal};
    font-size: 12px;
  }
  @media (max-width: 425px) {
    grid-template-columns: 40% auto;
  }
`;
const Button = styled.button`
  outline: none;
  padding: 10px;
  border: 0;
  background-color: #29434e;
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:focus {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;
export default class Customize extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <Option>
          <b>Website Theme</b>
          <span>
            <Link
              to={"/customize/" + store.getState().steemProfile.profile.user}
            >
              <Button>Edit Theme</Button>
            </Link>

            <p>
              Change appearance on
              <Link
                to={`/@${store.getState().steemProfile.profile.user}`}
              >{` steemblr.com/@${
                store.getState().steemProfile.profile.user
              }`}</Link>
            </p>
          </span>
        </Option>
      </Container>
    );
  }
}
