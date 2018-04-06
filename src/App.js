import React, { Component } from 'react'
import './App.css';
import Intro from './Components/Intro'
import Header from './Header/Header'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Portal from './Components/Portal'
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
      text: 'Complete'
    }
    this.apiCall = this.apiCall.bind(this)

    // Logging in with Token from firebase

    firebase.auth().signInWithCustomToken(localStorage.getItem('cToken')).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }) 
   
    // Example of simple post that only auth user can make

    firebase.database().ref('users/' + 'snwolak').set({
      blogName: 'Potęga Wiktorii i Pierwiastki Sajmonów',
      profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png'
    }) 

  }
  componentWillMount() {
    //this.apiCall()
    this.tokenCall()
  }
  async tokenCall() {
    const call = await fetch('http://localhost:5000/steady-dryad-163918/us-central1/sendBack?uuid=snwolak', {
      method: 'GET', 
      headers: {
        Accept: 'application/json'
      },
    }).then(function(response) {
        return response.json()
    })
      localStorage.setItem('cToken', call.token)
  }
  async apiCall() {

    const test = await fetch('http://localhost:5000/steady-dryad-163918/us-central1/helloWorld ', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
    }).then(function (response) {
      return response.json()
    })
    this.setState({
      text: test.Profile
    })

  }

  render() {
    return (
      <div className="App">
        <Header login={this.state.login} updateLoginStatus={this.updateLoginStatus} />
        {this.state.login === true ?
          <Portal /> :
          <Intro props={this.props} text={this.state.text} />}
      </div>
    );
  }
}

export default App