import React, { Component } from "react";
import checkProfile from "../Functions/checkProfile";
import BlogView from "./BlogView";
import NotFound from "../Components/NotFound";
import Spinner from "../Components/Spinner";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCheck();
  }

  async handleCheck() {
    await this.setState({
      profileExists: await checkProfile(this.props.match.params.username)
    });
  }
  render() {
    //profile needs to be in db to render blog
    if (this.state.profileExists === undefined) {
      return (
        <Container>
          <Spinner />
        </Container>
      );
    } else if (this.state.profileExists) {
      return <BlogView {...this.props} key={this.props.location.key} />;
    } else if (this.state.profileExists === false) {
      return <NotFound />;
    }
  }
}

export default Blog;
