import React, { Component } from "react";
import styled from "styled-components";
import defaultApp from "../../environment";
import "firebase/auth";
import RegisterBtn from "../../Components/RegisterBtn";
import Success from "./Success";
import Spinner from "../../Components/Spinner";
import BackBtn from "../../Components/BackBtn";
import UsernameChecker from "./UsernameChecker";
import { debounce } from "lodash";
import checkProfile from "../../Functions/Firebase/checkProfile";
import steem from "steem";
const Container = styled.div`
  animation: pulse 1s 1;
  p {
    color: #fff;
  }
  @keyframes pulse {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 10px;
  input {
    padding: 5px;
    margin-bottom: 10px;
    width: 250px;
    outline: none;
  }
  button {
    width: 250px;
  }
`;
const Terms = styled.div`
  width: 250px;
  color: #fff;
  padding: 10px;
  font-size: 12px;
`;

const UsernameContainer = styled.div`
  position: relative;

  span {
    position: absolute;
    right: 0;
    top: 2px;
    margin-left: 10px;
  }
`;
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSignedUp: false,
      isSending: false,
      isError: false,
      errorMsg: "",
      blogsname: "",
      showUsernameChecker: false,
      isUsernameTaken: true
    };
    this.usernameInputDebounce = debounce(async function(e) {
      await this.checkUsername();
    }, 1000);
  }
  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
    if (name === "blogsname") {
      e.persist();
      this.usernameInputDebounce(e);
    }
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      isSending: true,
      isError: false
    });
    await defaultApp
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        res.user.updateProfile({
          displayName: this.state.blogsname
        });
      })
      .catch(error => {
        this.setState({
          isSending: false,
          isError: true,
          errorMsg: error.message
        });
      });
    if (this.state.isError === false) {
      await defaultApp.auth().onAuthStateChanged(user => {
        if (user.emailVerified === false) {
          user.sendEmailVerification();
        }
      });
      this.setState({
        isSending: false,
        isSignedUp: true
      });
    }
  };
  checkUsername = async () => {
    //function which checks username availability
    //it check steem usernames and firebase db
    const { blogsname } = this.state;
    if (blogsname.length < 3) {
      return void 0;
    }
    const checkDB = await checkProfile(blogsname);
    if (checkDB) {
      this.setState({
        isUsernameTaken: true,
        showUsernameChecker: true
      });
    } else {
      const checkSTEEM = await steem.api
        .lookupAccountNamesAsync([blogsname])
        .then(res => {
          return res;
        })
        .then(res => res)
        .catch(err => {
          console.log(err);
        });
      if (checkSTEEM[0] === null) {
        this.setState({
          isUsernameTaken: false,
          showUsernameChecker: true
        });
      } else {
        this.setState({
          isUsernameTaken: true,
          showUsernameChecker: true
        });
      }
    }
  };
  render() {
    const {
      email,
      password,
      isSignedUp,
      isSending,
      isError,
      errorMsg,
      blogsname,
      isUsernameTaken,
      showUsernameChecker
    } = this.state;
    return (
      <Container>
        {isError && <p>{errorMsg}</p>}
        {isSending && <Spinner />}
        {isSignedUp ? (
          <Success />
        ) : (
          <Form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="new-email"
              onChange={e => this.handleChange(e)}
              value={email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              minLength="6"
              maxLength="64"
              onChange={e => this.handleChange(e)}
              value={password}
              required
            />
            <UsernameContainer>
              <input
                type="text"
                name="blogsname"
                placeholder="Blog display name"
                autoComplete="blogsname"
                onChange={e => this.handleChange(e)}
                minLength="3"
                maxLength="32"
                value={blogsname}
                required
              />
              {showUsernameChecker && (
                <UsernameChecker
                  username={blogsname}
                  isUsernameTaken={isUsernameTaken}
                />
              )}
            </UsernameContainer>
            <Terms>
              By clicking submit, you agree to our{" "}
              <a
                href="/termsofservice"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Terms
              </a>.
            </Terms>

            {isSending || isUsernameTaken ? (
              <RegisterBtn type="submit" disabled>
                Submit
              </RegisterBtn>
            ) : (
              <RegisterBtn type="submit">Submit</RegisterBtn>
            )}
          </Form>
        )}
        <BackBtn onClick={() => this.props.handleForm("")}>Back</BackBtn>
      </Container>
    );
  }
}
