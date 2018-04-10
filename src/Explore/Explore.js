import React, { Component } from 'react'
import HeaderTabs from './HeaderTabs'
import Trending from './Trending'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom"


const place = ({ match }) => (

  <div>
  <h3>Section: {match.params.sectionName}</h3>
</div>
  
)

const Explore = ({ match }) => {
  
  return ( 
    <div>
      <HeaderTabs match={match}/>
      
      
      
      <Route path={`${match.url}/trending`} component={Trending} />
    </div>
  )
}


export default Explore
  