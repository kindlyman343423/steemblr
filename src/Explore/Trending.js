import React, { Component } from 'react'
import Post from '.././Components/Post'
import getTrendingPosts from '.././Functions/getTrendingPosts'

import Spinner from '.././Components/Spinner'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Masonry from 'react-masonry-component'
import InfiniteScroll from 'react-infinite-scroller'

import styled from 'styled-components'

//REDUX
import { connect } from 'react-redux'
import { getUserFollowing } from '.././actions/steemActions' 
import store from '.././store'
const styles = {

  margin: '0 auto',

}
const Container = styled.div`
  margin-top: 2em;

`

class Trending extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      posts: [],
      layoutReady: false,
      items: store.getState()
    }
    this.updateFollowingState = this.updateFollowingState.bind(this)
    
    store.subscribe(() => {
      this.setState({
        items: store.getState()
      })
    })
    
  }
  async loader() {

    const prevState = this.state.posts
    const apiCall = await getTrendingPosts('dtube')
    const children = prevState.concat(apiCall)
   
    this.setState({
      posts: children
    })
    
  }
  async componentWillMount() {
    this.setState({
      items: await store.getState(),
      posts: await getTrendingPosts('dsound'), 
      
    })
  }
  async componentDidMount() {
    
    this.setState({
      isLoading: false
    })
    
  }
 
  handleLayoutReady() {
    if(!this.state.layoutReady) {
      this.setState({
        layoutReady: true,
       
      })
    }
  }
  checkFollowing(author) {
    console.log()
    if(this.state.items.following.users === undefined) {
      return false
    }
    return this.state.items.following.users.includes(author)
  }
  async updateFollowingState() {
    await this.props.getUserFollowing(this.state.items.steemProfile.profile._id)
    console.log('UPDEJTUJ')
  }
  render() {
    const masonryOptions = {
      padding: 0,
      fitWidth: true,
      gutter: 20,
      transitionDuration: 0,
      visibility: this.state.layoutReady ? 'visible' : 'hidden', 
    }
    if (this.state.isLoading) return (<MuiThemeProvider><Spinner /></MuiThemeProvider>)
    return (
      <Container>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loader.bind(this)}
          
          hasMore={true}
          loader={<MuiThemeProvider  key={Math.random()} ><Spinner key={Math.random()}/></MuiThemeProvider>}

        >
          
          <Masonry 
            style={styles}
            options={masonryOptions}
            threshold={250}
            onLayoutComplete={this.handleLayoutReady.bind(this)}
          >

          {this.state.posts.map((post) => {
            
            return <Post post={post} 
                    username={this.state.items.steemProfile.profile._id} 
                    isFollowing={this.state.items.following.users.includes(post.author)} 
                    key={post.permlink + Math.random()}
                    updateFollowingState={this.updateFollowingState}
                    />
          })}
            


          </Masonry>

        </InfiniteScroll>


      </Container>

    )
  }
}

const mapStateToProps = state => ({
  steemProfile: state.steemProfile,
  following: state.following,
})

export default connect(mapStateToProps, {getUserFollowing})(Trending)