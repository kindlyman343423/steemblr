import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";

const Container = styled.div`
  color: ${colors.font.normal};
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 25px;
  span {
    box-sizing: border-box;
    padding-left: 5px;
    font-size: 12px;
    text-align: left;
    padding-bottom: 5px;
    width: 60%;
    border-bottom: 2px solid ${colors.font.normal};
    text-transform: uppercase;
  }
  ul {
    padding: 0;
    text-align: left;
    width: 60%;
    list-style: none;
    li {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      font-weight: 300;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      b {
        color: ${colors.font.lightNormal};
      }
      img {
        margin-right: 10px;
        width: 35px;
        max-height: 35px;
        height: auto;
      }
      padding: 10px 0px 10px 5px;
      border-bottom: 1px solid ${colors.font.normal};
      button {
        align-self: center;
        margin-left: auto;
        margin-right: 10px;
      }
    }
  }
`;
const Button = styled.button`
  box-sizing: border-box;
  font-size: 24px;
  border-radius: 2%;
  outline: none;
  align-self: flex-end;
  float: right;
  padding: 0px 8px 0px 8px;
  border: 0;
  background-color: ${colors.font.normal};
  outline: none;
  color: #1c313a;
  font-weight: 700;
  transition: 0.2s;
  &:hover {
    background-color: #cfd8dc;
    transition: 0.2s;
  }
`;
export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <span>Trending blogs</span>
        <ul>
          <li>
            <img
              src="https://steemitimages.com/u/haejin/avatar"
              alt="haejin blog avatar"
            />
            <div>
              <b>blog's url </b> <br />
              Blog title
            </div>
            <Button> + </Button>
          </li>
          <li>
            <img
              src="https://steemitimages.com/u/haejin/avatar"
              alt="haejin blog avatar"
            />
            <div>
              <b>blog's url </b> <br />
              Blog title
            </div>
            <Button> + </Button>
          </li>
          <li>
            <img
              src="https://steemitimages.com/u/haejin/avatar"
              alt="haejin blog avatar"
            />
            <div>
              <b>blog's url </b> <br />
              Blog title
            </div>
            <Button> + </Button>
          </li>
          <li>
            <img
              src="https://steemitimages.com/u/haejin/avatar"
              alt="haejin blog avatar"
            />
            <div>
              <b>blog's url </b> <br />
              Blog title
            </div>
            <Button> + </Button>
          </li>
        </ul>
      </Container>
    );
  }
}
