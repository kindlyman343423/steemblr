import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import cookie from 'react-cookies'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cookies: cookie.load('login')
    }
  }
  componentWillMount() {
    cookie.save('login', {userId:'admin', password:'admin1'})
    cookie.loadAll()
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">

         {this.state.cookies.userId + ' ' + this.state.cookies.password}
        </p>
      </div>
    );
  }
}

export default App;
