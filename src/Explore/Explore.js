import React, { Component } from 'react'
import HeaderTabs from './HeaderTabs'
import Trending from './Trending'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom"



export default class Explore extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }

  }
  
  render() {
    return (
      <div>
        <HeaderTabs match={this.props.match} />



        <Route path={`${this.props.match.url}/trending`} render={(props) => (
          <Trending {...props} following={this.props.following} username={this.props.username}/>
        )} />
      </div>
    )
  }
}



