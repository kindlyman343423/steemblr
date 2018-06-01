import React, { Component } from "react";
import { hot } from "react-hot-loader";
//CSS
import "./App.css";
//COMPONENTS
import Home from "./Home/";
import Logout from "./Components/Logout";
import Explore from "./Explore/Explore";
import RedirectLoginToken from "./Components/RedirectLoginToken";
import Intro from "./Intro/";
import Search from "./Search/";
//FIREBASE
import getFirebaseToken from "./Functions/getFirebaseToken";
import firebaseAuth from "./Functions/firebaseAuth";
//FUNCTIONS
import getFollowing from "./Functions/getFollowing";
//REACT ROUTER
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import colors from "./styles/colors";

import { injectGlobal } from "styled-components";

Modal.setAppElement("#root");

injectGlobal`
  body {
    background-color:${colors.background}
  }
`;
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
  }
  async componentWillMount() {
    if (this.state.login) {
      await this.props.getUserProfile();
      await this.props.getUserFollowing(this.props.steemProfile.profile._id);
      await this.props.getProfileVotes(this.props.steemProfile.profile._id);
      const profile = await this.props.steemProfile;
      const followingBucket = await getFollowing(profile._id);
      this.props.changeLoginStatus(true);
      this.setState({
        steemProfile: profile,
        followings: followingBucket
      });

      this.handleFirebaseLogin();
    }
  }

  handleLogout() {
    this.setState({
      login: localStorage.getItem("token") !== null ? true : false,
      cLogin: localStorage.getItem("cToken") !== null ? true : false
    });
  }
  async handleFirebaseLogin() {
    await getFirebaseToken(this.props.steemProfile.profile._id);
    firebaseAuth();
  }
  render() {
    return (
      <Router>
        <div id="root" className="App">
          <Route exact path="/" component={Intro} />
          <Route
            exact
            path="/home"
            render={props => <Home {...props} login={this.state.login} />}
          />
          {window.location.pathname === "/" && this.state.login === true ? (
            <Redirect to="/home" />
          ) : (
            void 0
          )}
          <Route
            exact
            path="/logout"
            render={props => (
              <Logout {...props} handleLogout={this.handleLogout} />
            )}
          />
          <Route
            path="/explore"
            render={props => <Explore {...props} login={this.state.login} />}
          />

          <Route path="/redirect" component={RedirectLoginToken} />
          <Route
            path="/search"
            render={props => <Search {...props} login={this.state.login} />}
          />
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

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    getUserFollowing,
    changeLoginStatus,
    getProfileVotes,
    getSteemTrendingPosts
  }
)(hot(module)(App));
