import React, { Component } from 'react'
import './App.css';
import Home from './Components/Home'
import Logout from './Components/Logout'
import Intro from './Components/Intro'
import Header from './Header/Header'
import Explore from './Explore/Explore'


import getFirebaseToken from './Functions/getFirebaseToken'
import firebaseAuth from './Functions/firebaseAuth'
import steemProfile from './Functions/steemProfile'

import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom"

import environment from './environment'
import firebase from 'firebase'
import 'firebase/database'

firebase.initializeApp(environment)



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: localStorage.getItem('token') !== null ? true : false,
      cLogin: localStorage.getItem('cToken') !== null ? true : false,

    }

    this.handleLogout = this.handleLogout.bind(this)





  }
  async componentWillMount() {

    if (this.state.login) {
      const profile = await steemProfile()

      getFirebaseToken(profile._id)
      if (this.state.cLogin) {
        firebaseAuth()
        /*
        // Example of simple post that only auth user can make

        firebase.database().ref('users/' + profile._id).set({
          blogName: 'Potęga Wiktorii i Pierwiastki Sajmonów',
          profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png'
        }) */
      }
    }
    //this.apiCall()
    //this.tokenCall()
  }



  handleLogout() {

    this.setState({
      login: localStorage.getItem('token') !== null ? true : false,
      cLogin: localStorage.getItem('cToken') !== null ? true : false,
    })
  }

  render() {

    return (
      <Router >
        <div className="App">
          <Header key={this.state.login} login={this.state.login} />



          <Route exact path='/home' component={Home} />
          
          <Route exact path='/logout' render={(props) => (
            <Logout {...props} handleLogout={this.handleLogout} />
          )} />

          <Route path='/explore' component={Explore} />

        </div>

      </Router>

    );
  }
}

export default App