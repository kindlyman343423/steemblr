import React, { Component } from 'react'
import Modal from 'react-modal'
import api from '../Api'
import styled from 'styled-components'

const Anchor = styled.a`
  color: black;
`
const customStyles = {
  a: {
    color: 'red'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};




export default class LoginModal extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount() {
    const url = window.location.href
    
    if(url.includes('access_token')){
      const accessToken = url.split('access_token=').pop().split('&').shift();
      localStorage.setItem('token', accessToken)
      window.location = 'home'
    }

  }

  openModal() {
    this.setState({modalIsOpen: true});
    
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed. 
  }
  
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const link = api.getLoginURL()
    return (
      <div>
        <button onClick={this.openModal}>Login</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <Anchor a href={link}>Login with steemconnect</Anchor>
        </Modal>
      </div>
    )
  }
}
