import React, { Component } from 'react'
import steem from 'steem'

const getFollowing = async (props) => {
  let bucket = [];
  const call = await steem.api.getFollowingAsync(props, 0, 'blog', 1000).then((result) => {
    result.map((item) => {
      bucket.push(item.following)
    })
    return result
  }).catch(function(error) {
    console.log(error)
  })

  return bucket
  
}

export default getFollowing