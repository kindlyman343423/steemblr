import React, { Component } from 'react'
import steem from 'steem'

const getTrendingPosts = async (props) => {
  var query = {
    tag: props,
    limit: 100,
  };
  return await steem.api.getDiscussionsByTrending(query , function(err, result) {
    console.log(err, result);
  });
}

export default getTrendingPosts