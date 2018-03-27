import React, { Component } from 'react';
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
       

         {this.state.cookies.userId + ' ' + this.state.cookies.password}
       
      </div>
    );
  }
}

export default App;
