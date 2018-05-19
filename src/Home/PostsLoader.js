import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import uuidv4 from "uuid/v4";
import Spinner from ".././Components/Spinner";
import Post from ".././Components/Post";
export default class PostsLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      posts: [],
      layoutReady: false,
      items: [],
      shouldLoad: false,
      paginationCounter: 10
    };
  }

  render() {
    return <div>Loading...</div>;
  }
}
