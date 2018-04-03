import React, { Component } from 'react';
import './App.css';

import Intro from './Components/Intro'
import Header from './Components/Header'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Portal from './Components/Portal'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: localStorage.getItem('token') !== null ? true : false,
    }

  }

  render() {
    return (
      <div className="App">
        <Header login={this.state.login} updateLoginStatus={this.updateLoginStatus}/>
        {this.state.login === true ? 
        <Portal />: 
        <Intro props={this.props}/>}
      </div>
    );
  }
}

export default App