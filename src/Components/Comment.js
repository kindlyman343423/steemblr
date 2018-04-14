import React, { Component } from 'react'
import styled from 'styled-components'

const Paragraph = styled.p`
  color: black
  word-wrap: break-word
`
const Nickname = styled.span`

  font-weight: 500;
`
export default class Comment extends Component {
  constructor(props) {
    super(props)
  
  }
  
  render() {
    return (
      <Paragraph>
        <Nickname>{this.props.author}</Nickname>: {this.props.body}
      </Paragraph>
    )
  }
}
