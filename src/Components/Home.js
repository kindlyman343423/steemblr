import React, { Component } from 'react'
import { Blockquote, Box, Card, BackgroundImage, Subhead, Flex, Heading, Banner } from 'rebass'

import getTrendingPosts from '.././Functions/getTrendingPosts'
 
class Home extends Component {

  constructor(props) {

    super(props)

    this.state = {

    }
    getTrendingPosts('dsound')
  }

  render() {

    return (
      
      <Flex alignItems='center' justifyContent='center' flexWrap='wrap' flexDirection='column'>


        <Box width={1 / 2} p={3}>
          <Card >
            <Banner
              color='white'
              bg='gray8'
              backgroundImage='https://78.media.tumblr.com/604ed3aaef4bb815dadc13dff8fede93/tumblr_oxw13gOF8g1vxwt7xo1_500.gif'>
              <Heading
                f={[4, 5, 6, 7]}>
                Ambitny tekst o życiu
              </Heading>
            </Banner>

            <Subhead p={2} textAlign='left'>
              Hello
              </Subhead>
            <Blockquote>
              “The simplest scale is a single note, and sticking with a single note draws more attention to other parameters, such as rhythm and inflection.”
            </Blockquote>
          </Card>
        </Box>
        


      
      
      </Flex>
      
    )
  }
}

export default Home