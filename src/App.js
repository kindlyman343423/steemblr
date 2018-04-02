import React, { Component } from 'react';
import './App.css';
import cookie from 'react-cookies'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginForm from './Components/LoginForm'
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: cookie.load('login') !== undefined ? true : false,
    }
    
  }
  componentDidMount() {

    console.log(this.state.login)

  }
  render() {
    return (
      <div className="App">
          <LoginForm/>
      </div>
    );
  }
}

export default App