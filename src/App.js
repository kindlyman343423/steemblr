import React, { Component } from "react";
import api from "./Api";
import { hot } from "react-hot-loader";
//CSS
import "./App.css";
//COMPONENTS
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import Intro from "./Components/Intro";
import Header from "./Header/Header";
import Explore from "./Explore/Explore";

//FIREBASE
import getFirebaseToken from "./Functions/getFirebaseToken";
import firebaseAuth from "./Functions/firebaseAuth";
import environment from "./environment";
import firebase from "firebase";
import "firebase/database";
import uploadFiles from "./Functions/uploadFiles";
//FUNCTIONS
import steemProfile from "./Functions/steemProfile";
import getFollowing from "./Functions/getFollowing";
//REACT ROUTER
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect
} from "react-router-dom";
//REDUX STUFF
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserFollowing,
  changeLoginStatus,
  getProfileVotes,
  getSteemTrendingPosts
} from "./actions/steemActions";
import Modal from "react-modal";

Modal.setAppElement("#root");
firebase.initializeApp(environment);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: localStorage.getItem("token") !== null ? true : false,
      cLogin: localStorage.getItem("cToken") !== null ? true : false,
      steemProfile: [],
      followings: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClickCC = this.handleClickCC.bind(this);
  }
  async componentWillMount() {
    if (this.state.login) {
      await this.props.getUserProfile();
      await this.props.getUserFollowing(this.props.steemProfile.profile._id);
      await this.props.getProfileVotes(this.props.steemProfile.profile._id);
      const profile = await steemProfile();
      const followingBucket = await getFollowing(profile._id);
      this.props.changeLoginStatus(true);
      this.setState({
        steemProfile: profile,
        followings: followingBucket
      });

      this.state.cLogin === false ? getFirebaseToken(profile._id) : void 0;
      if (this.state.cLogin) {
        firebaseAuth();

        // Example of simple post that only auth user can make

        /* firebase.database().ref('users/' + profile._id).set({
          blogName: 'Potęga Wiktorii i Pierwiastki Sajmonów',
          profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/1024px-Placeholder_no_text.svg.png'
        }) */
      }
    }
  }

  handleLogout() {
    this.setState({
      login: localStorage.getItem("token") !== null ? true : false,
      cLogin: localStorage.getItem("cToken") !== null ? true : false
    });
  }
  async handleClickCC() {
    //sendComment()  <button onClick={this.handleClickCC}> Click to send Comment </button>
  }
  render() {
    return (
      <Router>
        <div id="root" className="App">
          <Route
            exact
            path="/home"
            render={props => <Home {...props} login={this.state.login} />}
          />

          <Route
            exact
            path="/logout"
            render={props => (
              <Logout {...props} handleLogout={this.handleLogout} />
            )}
          />

          <Route path="/explore" component={Explore} />
          {this.state.login ? <Redirect to="home" /> : void 0}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  steemProfile: state.steemProfile,
  following: state.following,
  login: state.login,
  steemProfileVotes: state.steemProfileVotes,
  trendingPosts: state.trendingPosts
});

export default connect(mapStateToProps, {
  getUserProfile,
  getUserFollowing,
  changeLoginStatus,
  getProfileVotes,
  getSteemTrendingPosts
})(hot(module)(App));
