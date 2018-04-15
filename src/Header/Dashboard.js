import React, { Component } from 'react'
import api from '../Api'
import { NavLink } from "react-router-dom"

import './Dashboard.css'



import ProfileMenu from './ProfileMenu'
import { MdHome, MdExplore, MdBorderColor} from 'react-icons/lib/md/'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



export default class componentName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: ''
    }

  }

  async componentWillMount() {
    const profile = await api.me(function (err, res) {
      //console.log(err, res)
      if (err !== null) {
        return err
      } else {
        return res
      }
    });
 
  }
  render() {
    const dashboard = {
      padding: '5px',
      marginRight: '3em',
      display: 'flex',
      alignItems:'center',
      justifyContent: 'flex-end',
    }

    return (
      
        <div style={dashboard} className="dashboardIcons">
        <NavLink activeClassName="selected" className="dashboardIcon" to="/home" ><MdHome size={32}/></NavLink>
        <NavLink activeClassName="selected" className="dashboardIcon" to="/explore/"><MdExplore size={32}/></NavLink>
        <NavLink activeClassName="selected" className="dashboardIcon" to="/AddNew"><MdBorderColor size={24}/></NavLink>
        <MuiThemeProvider><ProfileMenu /> </ MuiThemeProvider>
        </div>
     
    )
  }

  newMethod() {
    return '5px';
  }
}
