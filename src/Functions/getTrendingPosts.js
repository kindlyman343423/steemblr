import React, { Component } from 'react'
import steem from 'steem'

const getTrendingPosts = async (props) => {
  const query = {
    tag: props,
    limit: 10 ,
  };
  let bucket = [];
  const call = await steem.api.getDiscussionsByTrendingAsync(query).then((result) => {
    bucket.push(result)
    return result
  }).catch(function(error) {
    console.log(error)
  })
  
  return bucket[0]
 
  
}

export default getTrendingPosts