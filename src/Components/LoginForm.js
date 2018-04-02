import React, { Component } from 'react'
import Validation from './Validation'
import cookie from 'react-cookies'

export default class LoginForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       name: '',
       wif: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  async handleSubmit(e) {
    e.preventDefault();
    const validationPromise = await Validation(this.state)
    if(this.state.name.length < 3 || this.state.wif.length < 51) {

      //placeholder for future alerts
      return alert('Wrong username or password')
    } else if(validationPromise === false) {
      return alert('Wrong username or password')
    } else if(validationPromise === true) {
      cookie.save('token', {name: this.state.name, wif: this.state.wif})
      return alert('Success!!')
    }
    
    
     

  }
  handleInputChange(e) {
    const target = e.target;
    let value = e.target.value;
    const name = target.name;

    this.setState({
        [name]: value
    })
  }
  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <input name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Steem username" />
          <input name="wif" value={this.state.wif} onChange={this.handleInputChange} placeholder="Private posting key" />
          <button>Login</button>
        </form>
    )
  }
}
