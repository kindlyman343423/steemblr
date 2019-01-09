import React, { Component } from "react";
import { hot } from "react-hot-loader";
//CSS
import "./App.css";
import LoadingSpin from "./Components/LoadingSpin";
//FIREBASE
import getFirebaseToken from "./Functions/getFirebaseToken";
import firebaseAuth from "./Functions/firebaseAuth";
import defaultApp from "./environment";
import "firebase/auth";
//REACT ROUTER
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserFollowing,
  getProfileVotes,
  getSteemTrendingPosts
} from "./actions/steemActions";
import { changeLoginStatus, getLoggedProfile } from "./actions/stateActions";
import getUserSettings from "./actions/getUserSettings";
import Modal from "react-modal";
import colors from "./styles/colors";

import { injectGlobal } from "styled-components";
import { IntlProvider } from "react-intl";
import Loadable from "react-loadable";
Modal.setAppElement("#root");
function Loading(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    return <LoadingSpin />;
  } else {
    return null;
  }
}
const Intro = Loadable({
  loader: () => import("./Intro/"),
  loading: Loading,
  delay: 400
});
const Explore = Loadable({
  loader: () => import("./Explore/Explore"),
  loading: Loading,
  delay: 400
});
const Home = Loadable({
  loader: () => import("./Home"),
  loading: Loading,
  delay: 400
});
const Settings = Loadable({
  loader: () => import("./Settings"),
  loading: Loading,
  delay: 400
});
const EditTheme = Loadable({
  loader: () => import("./EditTheme/"),
  loading: Loading,
  delay: 400
});
const Blog = Loadable({
  loader: () => import("./Blog"),
  loading: Loading,
  delay: 400
});
const Search = Loadable({
  loader: () => import("./Search/"),
  loading: Loading,
  delay: 400
});
const Logout = Loadable({
  loader: () => import("./Components/Logout"),
  loading: Loading,
  delay: 400
});
const RedirectLoginToken = Loadable({
  loader: () => import("./Components/RedirectLoginToken"),
  loading: Loading,
  delay: 400
});
injectGlobal`
  body {
    background-color:${colors.background}
  }
`;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steemToken: localStorage.getItem("steemToken") !== null ? true : false,
      googleToken: localStorage.getItem("googleToken") !== null ? true : false,
      steemProfile: [],
      followings: "",
      fetchingData: true
    };
  }
  async componentDidMount() {
    await defaultApp.auth().onAuthStateChanged(user => {
      if (user.displayName !== null) {
        this.handleEmailLogin(user);
        this.props.getLoggedProfile(user);
      }
    });

    if (this.state.steemToken) {
      Promise.all([
        await this.props.changeLoginStatus({
          status: false,
          platform: "steem"
        }),
        await this.props.getUserProfile(),
        await this.props.getUserFollowing(this.props.steemProfile.profile._id),
        await this.props.getProfileVotes(this.props.steemProfile.profile._id),
        await this.handleFirebaseLogin(),
        await this.props.getUserSettings()
      ]).then(() => {
        this.setState({
          fetchingData: false
        });
      });
      const username = this.props.steemProfile.profile._id;
      this.props.changeLoginStatus({
        status: true,
        platform: "steem",
        username: username,
        token: this.state.steemToken
      });

      const profile = await this.props.steemProfile;
      const followingBucket = await this.props.following.users;
      this.setState({
        steemProfile: profile,
        followings: followingBucket
      });
    } else {
      this.setState({
        fetchingData: false
      });
    }
  }
  handleEmailLogin = async props => {
    await this.props.changeLoginStatus({
      status: false,
      platform: "email",
      username: props.displayName,
      token: props._lat
    });
    await this.props.getLoggedProfile(props);
    await this.props.getUserSettings();
    await this.props.changeLoginStatus({ status: true, platform: "email" });
    this.setState({
      fetchingData: false
    });
  };
  handleLogout = () => {
    this.setState({
      steemToken: localStorage.getItem("steemToken") !== null ? true : false,
      googleToken: localStorage.getItem("googleToken") !== null ? true : false
    });
    this.props.changeLoginStatus({ status: false, platform: "" });
    defaultApp
      .auth()
      .signOut()
      .then(res => {
        // Sign-out successful.
      })
      .catch(err => {
        // An error happened.
      });
  };
  async handleFirebaseLogin() {
    await getFirebaseToken(this.props.steemProfile.profile._id);
    firebaseAuth();
  }
  render() {
    if (this.state.fetchingData) {
      return <LoadingSpin />;
    } else {
      return (
        <IntlProvider locale={navigator.language}>
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
                render={props => (
                  <Explore {...props} login={this.state.login} />
                )}
              />

              <Route path="/redirect" component={RedirectLoginToken} />
              <Route
                path="/search/:tag/:category"
                render={props => <Search {...props} login={this.state.login} />}
              />
              <Route path="/@:username" render={props => <Blog {...props} />} />
              <Route
                path="/post/@:username/:permlink"
                render={props => <Blog {...props} />}
              />
              <Route
                path="/settings/:option"
                render={props => <Settings {...props} />}
              />
              <Route
                path="/customize/:username/:option"
                render={props => <EditTheme {...props} />}
              />
            </div>
          </Router>
        </IntlProvider>
      );
    }
  }
}

const mapStateToProps = state => ({
  steemProfile: state.steemProfile,
  following: state.following,
  login: state.login,
  steemProfileVotes: state.steemProfileVotes,
  trendingPosts: state.trendingPosts,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    getUserFollowing,
    changeLoginStatus,
    getProfileVotes,
    getSteemTrendingPosts,
    getUserSettings,
    getLoggedProfile
  }
)(hot(module)(App));
