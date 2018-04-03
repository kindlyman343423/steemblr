import React, { Component } from 'react'

import Dashboard from './Dashboard'
import LoginModal from './LoginModal'
import './Header.css' 
export default class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      login: this.props.login
    }

  }

  render() {
    return (
      <div className="Header">
        <h1>steemblr</h1>

        
          <input placeholder="Search" />  
          {this.state.login === true ? <Dashboard /> : <LoginModal updateAppComponent={this.updateAppComponent}/>}
        

      </div>
    )
  }
}
