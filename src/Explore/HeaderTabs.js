import React, { Component } from 'react'
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom"

const NavBar = styled.div`
  display: inline-flex;
  a {
    padding: 5px;
  }
  font-weight: bold;

`
const HeaderTabs = ({match}) =>  { 

  const content = [
    'trending',
    'staff-picks',
    'text',
    'photos',
    'gifs',
    'quotes',
    'links',
    'chats',
    'audio',
    'video',
    'asks'
  ]
  return(

    <NavBar>

     {
       content.map((name) => {
         const treatedName = name[0].toUpperCase() + name.slice(1) 
         return <NavLink key={name} activeClassName="selected" to={`${match.url}/${name}`}>{treatedName.replace('-', ' ')}</NavLink>
       })
     }
    
    
    </NavBar>
  )
}
  





export default HeaderTabs