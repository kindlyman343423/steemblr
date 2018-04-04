import React, { Component } from 'react'
import api from '../Api'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom"

import './Dashboard.css'
import { Avatar } from 'rebass'
import Header from './Header'

import { MdHome, MdExplore, MdBorderColor} from 'react-icons/lib/md/'
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
    const avatar = JSON.parse(profile.account.json_metadata).profile.profile_image
    this.setState({
      avatar: avatar
    })

    console.log(avatar)
  }
  render() {
    const dashboard = {
      padding: '20px',
      display: 'flex',
      alignItems:'center',
      textDecoraton: 'none'
    }

    return (
      <Router >
        <div style={dashboard}>
        <NavLink activeClassName="selected" to="/home"><MdHome size={48}/></NavLink>
        <NavLink activeClassName="selected" to="/explore"><MdExplore size={48}/></NavLink>
        <NavLink activeClassName="selected" to="/AddNew"><MdBorderColor size={36}/></NavLink>
        <Avatar
          size={48}
          src={this.state.avatar}
        />
        </div>
      </Router>
    )
  }
}
