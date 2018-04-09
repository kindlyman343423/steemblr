import React, { Component } from 'react'
import { Blockquote, Box, Card, BackgroundImage, Subhead, Flex, Heading, Banner } from 'rebass'


class Home extends Component {

  constructor(props) {

    super(props)

    this.state = {

    }

  }

  render() {

    return (
      
      <Flex alignItems='center' justifyContent='center' flexWrap='wrap' flexDirection='column'>


        <Box width={1 / 2} p={3}>
          <Card >
            <Banner
              color='white'
              bg='gray8'
              backgroundImage='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'>
              <Heading
                f={[4, 5, 6, 7]}>
                Ale to nie jest rozmowa na telefon
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