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
import { getUserFollowing, getProfileVotes, getSteemTrendingPosts } from '.././actions/steemActions' 
import store from '.././store'
import api from '../Api';

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
      items: [],
      shouldLoad: false,
      paginationCounter: 5,
    }
    
    
    store.subscribe(() => {
      this.setState({
        items: store.getState()
      })
    })
    
    this.updateFollowingState = this.updateFollowingState.bind(this)
    this.updateVotingState = this.updateVotingState.bind(this)
    this.loader = this.loader.bind(this)
    
    
  }
  async loader() {
    
      if(Object.keys(this.state.items.trendingPosts.posts).length === 0) {
        
        
      } else {
        console.log(typeof this.state.items.trendingPosts.posts)

    const prevState = this.state.posts
    const apiCall = await getTrendingPosts('dtube')
    if(this.props.trendingPosts.posts === []) {
     
    }
   
    this.setState({
      posts: this.props.trendingPosts.posts.slice(0, this.state.paginationCounter),
      paginationCounter: this.state.isLoading === true ? this.state.paginationCounter : this.state.paginationCounter + 5
    })
    console.log(this.state.paginationCounter)
      }

      
  }
  componentWillMount() {
    this.props.getSteemTrendingPosts()
    
  }
  componentWillReceiveProps() {
    this.setState({
      posts: this.props.trendingPosts.posts
    })
  }
  async componentDidMount() {

    this.setState({
      items: await store.getState(),
      posts: await this.props.trendingPosts.posts,

    })
  }
  componentWillReceiveProps() {
    console.log('test otrzymywania propsów')
    setTimeout(this.setState({
      shouldLoad: true,
      isLoading: false,
    }), 2000)
  }
  handleLayoutReady() {

    if(!this.state.layoutReady) {
      this.setState({
        layoutReady: true,
       
      })
    }
  }
  checkFollowing(author) {
    if(this.state.items.following.users === undefined) {
      return false
    }
    return this.state.items.following.users.includes(author)
  }
  
  //UPDATING REDUX STORE
  async updateFollowingState() {
    await this.props.getUserFollowing(this.state.items.steemProfile.profile._id)
  }
  async updateVotingState() {
    await this.props.getProfileVotes(this.state.items.steemProfile.profile._id)
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
          loadMore={this.loader}
          initialLoad={this.state.shouldLoad}
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
                    let fullPermlink = [post.root_author, post.root_permlink].join('/')
            return <Post post={post} 
                   
                    username={this.state.items.steemProfile.profile._id} 
                    isFollowing={this.state.items.following.users.includes(post.author)} 
                    key={post.permlink + Math.random()}
                    updateFollowingState={this.updateFollowingState}
                    updateVotingState={this.updateVotingState}
                    voteStatus={this.state.items.steemProfileVotes.votes.includes(fullPermlink)}
                    fullPermlink={fullPermlink}
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
  steemProfileVotes: state.steemProfileVotes,
  trendingPosts: state.trendingPosts
})


export default connect(mapStateToProps, {getUserFollowing, getProfileVotes, getSteemTrendingPosts})(Trending)