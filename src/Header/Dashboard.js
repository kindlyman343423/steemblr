import React, { Component } from 'react'
import api from '../Api'

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
      if(err !== null) {
        return err
      } else {
        return res
      }
    });
    const avatar =  JSON.parse(profile.account.json_metadata).profile.profile_image
    this.setState({
      avatar: avatar 
    })
    
    console.log(avatar)
  }
  render() {
    const avatarDiv = {
      //backgroundColor: "blue",
      backgroundImage: `url(${this.state.avatar})`
    }
    return (
      <div className="dashboard">
        <button>HOME</button>
        <button>EXPLORE</button>
        <div className="avatar" style={avatarDiv}></div>
        <button>CREATE</button>
      </div>
    )
  }
}
