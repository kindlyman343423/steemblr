import React, { Component } from 'react'
import Post from '.././Components/Post'
import getTrendingPosts from '.././Functions/getTrendingPosts'

import Spinner from '.././Components/Spinner'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Masonry from 'react-masonry-component'
import styled from 'styled-components'

const masonryOptions = {
  fitWidth: true,
  gutter: 10
}
const styles = {

  margin: '0 auto',
  
}
const Container = styled.div`

  margin-top: 2em;

`

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
        <Container>
          <Masonry 
            style={styles}
            options={masonryOptions}
          >
          {this.state.posts.map((post) => {
            return <Post props={post}/>
          })}
          </Masonry>
        
        </Container>
      
    )
  }
}
