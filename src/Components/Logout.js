import React, { Component } from 'react'

export default class Logout extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  

  componentWillMount() {    
    localStorage.removeItem('token')
    localStorage.removeItem('cToken')
    this.props.handleLogout()
  }

  render() {
    
    return (
      <div>
        <h2>Logout</h2>

        
      </div>
    )
  }
}
