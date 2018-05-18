import React, { Component } from "react";
import { hot } from "react-hot-loader";
import store from "../store";
import Header from "../Header/Header";
import styled from "styled-components";
import AddNew from "./AddNew";
const Layout = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-column-gap: 10px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 250px;
  padding-top: 50px;
`;
const SidebarContainer = styled.div`
  background-color: orange;
`;
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <div className="container">
        <Header login={this.props.login} />
        <Layout>
          <PostsContainer>
            <AddNew />
          </PostsContainer>
          <SidebarContainer>Test 2</SidebarContainer>
        </Layout>
      </div>
    );
  }
}

export default hot(module)(Home);
