import React, { Component } from 'react'
import LoginForm from './LoginForm'
import cookie from 'react-cookies'


export default class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      login: this.props.login
    }
    this.updateAppComponent = this.updateAppComponent.bind(this)

  }
  updateAppComponent() {
    this.setState({
      login: true
    })
    this.props.updateLoginStatus()
  }
  render() {
    return (
      <div>
        <h1>Header</h1>

        <div>
          <input placeholder="Search" />  
          {this.state.login === true ? <h3>DASHBOARD</h3> : <LoginForm updateAppComponent={this.updateAppComponent}/>}
        </div>

      </div>
    )
  }
}
