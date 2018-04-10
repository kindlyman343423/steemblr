import React, { Component } from 'react'
import styled from 'styled-components'
import { Blockquote, Box, Card, BackgroundImage, Subhead, Flex, Heading, Banner } from 'rebass'


const StyledDiv = styled.div`
    background-color: white;
    width: 24vw
    margin-bottom: 10px;
    padding: 0.1em;
  `
const Post = ({ props }) => (
  
  <StyledDiv>
    <Card >
      <Banner
        color='white'
        bg='gray8'
        backgroundImage='https://78.media.tumblr.com/604ed3aaef4bb815dadc13dff8fede93/tumblr_oxw13gOF8g1vxwt7xo1_500.gif'>
        <Heading
          f={[4, 5, 6, 7]}>
          {props.author}
      </Heading>
      </Banner>

      <Subhead  textAlign='left'>
        {props.author}
      </Subhead>
      <Blockquote>
        {props.title}
    </Blockquote>
    </Card>
  </StyledDiv>







)

export default Post