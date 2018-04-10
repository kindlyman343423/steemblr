  import React, { Component } from 'react'
  
  const Post = ({props}) => (
    
    <div> 
      <h3>{props.author}</h3>
      <p>{props.root_title}</p>
    </div>
  )

  export default Post