import React, { Component } from 'react'

import styled from 'styled-components'
import { Blockquote, Box, Card, BackgroundImage, Subhead, Flex, Heading, Banner, Text , ButtonTransparent} from 'rebass'
import { Avatar, MuiThemeProvider, FlatButton } from 'material-ui'
import { Link } from 'react-router-dom'

import api from '.././Api'
import followSteem from '.././Functions/followSteem'

const AvatarStyles = {
  borderRadius: '0%',
  margin: '5px',
  marginTop: '10px',
  marginLeft: '10px'
}
const BoxWithFollowBtn = {
  alignSelf: 'center'
}
const StyledDiv = styled.div`
    background-color: white;
    width: 25vw
    margin-bottom: 20px;
    padding: 0px !important;
    border-radius: 1%;

    
  `
const Button = styled.button`
    border-radius: 1%;
`
const StyledCard = Card.extend`
`
export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFollowing: this.props.isFollowing
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    followSteem(this.props.username, this.props.post.author)
    this.setState({
      isFollowing: true
    })
    setTimeout(this.props.updateFollowingState
      , 5000);

  }

  render() {
    return (
      <StyledDiv>
        <StyledCard p={0} >
          <Flex mx={-2} align-items="flex-start" alignContent="center" >
            <Box width={1 / 5}>
              <Text color='white' >
              <MuiThemeProvider> <Avatar size={34} style={AvatarStyles} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png" /> </MuiThemeProvider>
              </Text>
            </Box>
            <Box width='auto' style={BoxWithFollowBtn}>
              <Text p={2} fontSize='0.8em' fontWeight='500' alignSelf="center" >
                {this.props.post.author} {this.state.isFollowing ? '' : <MuiThemeProvider><FlatButton label="Follow" onClick={this.handleClick}/> </MuiThemeProvider>
            }
              </Text>
            </Box>
          </Flex>
          <Banner height="200px"
            color='white'
            bg='gray8'
            backgroundImage='https://78.media.tumblr.com/604ed3aaef4bb815dadc13dff8fede93/tumblr_oxw13gOF8g1vxwt7xo1_500.gif'>
            
          </Banner>

          <Subhead textAlign='left'>
            {this.props.post.author}
          </Subhead>
          <Blockquote>
            {this.props.post.title}
          </Blockquote>
        </StyledCard>
      </StyledDiv>
    )
  }
}

