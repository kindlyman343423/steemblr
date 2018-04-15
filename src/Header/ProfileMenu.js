import React, { Component } from 'react'

import { NavLink } from "react-router-dom"

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import styled from 'styled-components'
import  MdAccountBox from 'react-icons/lib/md/account-box'


const StyledDiv = styled.div`
  a {
    color: black
  }
 
`

export default class ProfileMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
    
  }
  
  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});
  
  render() {
    //<Avatar src={this.props.avatar} size={40} />
    return (
    
      <StyledDiv>
      
      
      <MdAccountBox size={32} onClick={this.handleToggle} className="dashboardIcon"/>
        <Drawer open={this.state.open} openSecondary={true} docked={false}  onRequestChange={(open) => this.setState({open})} >
        
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={this.logout}><NavLink to="/logout">Logout</NavLink></MenuItem>

          
        </Drawer>

        
      </StyledDiv>
      
    )
  }
}
