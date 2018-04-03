import React, { Component } from 'react'

import Dashboard from './Dashboard'
import LoginModal from './LoginModal'

export default class Header extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      login: this.props.login
    }

  }

  render() {
    return (
      <div>
        <h1>Header</h1>

        <div>
          <input placeholder="Search" />  
          {this.state.login === true ? <Dashboard /> : <LoginModal updateAppComponent={this.updateAppComponent}/>}
        </div>

      </div>
    )
  }
}
