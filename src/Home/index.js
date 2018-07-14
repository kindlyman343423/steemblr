import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Header from "../Header/Header";
import styled from "styled-components";
import AddNew from "./AddNew";
import Sidebar from "./Sidebar";
import PostsLoader from "./PostsLoader";
import UserBlog from "./UserBlog";
import { connect } from "react-redux";
const Layout = styled.div`
  display: grid;
  margin-top: 3em;
  grid-template-columns: 17% 43% auto;
  grid-column-gap: 25px;
  grid-template-areas:
    "userBlog main sidebar"
  }
  @media (max-width: 768px) {
    grid-template-columns: 60% 35%;
    grid-template-areas:
    "main sidebar";
    grid-column-gap: 10px;
  }
  @media (max-width: 425px) {
    grid-template-columns: 100%;
    grid-template-areas:
    "main"

    margin-top: 2em;
  }
  @media (max-width: 375px) {
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: fixed;
  top: 0;
`;
const PostsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  grid-area: main;
  @media (max-width: 2560px) {
  }
  @media (max-width: 1920px) {
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 768px) {
    margin-left: 25px;
  }
  @media (max-width: 425px) {
    margin-left: 0px;
    margin-right: 0px;
  }
  @media (max-width: 375px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;
const SidebarContainer = styled.div`
  padding-top: 23px;
  box-sizing: border-box;
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
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Layout>
          <UserBlog user={this.props.steemProfile} />
          <PostsContainer>
            <AddNew />
            <PostsLoader />
          </PostsContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  steemProfile: state.steemProfile
});
export default hot(module)(connect(mapStateToProps)(Home));
