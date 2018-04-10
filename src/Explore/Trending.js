import React, { Component } from 'react'
import Post from '.././Components/Post'
import getTrendingPosts from '.././Functions/getTrendingPosts'

import Spinner from '.././Components/Spinner'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class Trending extends Component {
  constructor(props) {
    super(props)
  
   this.state = {
      isLoading: true,
      posts: []
    }
    
  }
  async componentWillMount() {
  
    this.setState({
      posts: await getTrendingPosts('dsound'),
      isLoading: false
    })
   
  }  
  render() {
    
    if(this.state.isLoading) return (<MuiThemeProvider><Spinner/></MuiThemeProvider>)
    return (
      <div>
        {this.state.posts.map((post) => {
          return <Post props={post}/>
        })}
      </div>
    )
  }
}
