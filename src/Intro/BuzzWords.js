import React, { Component } from "react";

import styled from "styled-components";
import Waypoint from "react-waypoint";
import Footer from "./Footer";
const Container = styled.section`
  color: #fff;
  background: #bb4d00;
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  h2,
  h3,
  b {
    font-weight: 500;
  }
  p {
    max-width: 450px;
  }
  z-index: 4;
  h2 {
    font-size: 48px;
  }
  h3 {
    font-size: 32px;
  }
  b {
    font-size: 24px;
  }
  @media (max-width: 425px) {
  }
`;
const Grid = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const ConceptContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  button {
    background-color: transparent;
    padding: 10px;
    font-size: 16px;
    border: 0;
    outline: none;
    color: #fff;
    cursor: pointer;
  }
  @media (max-width: 425px) {
    width: 100vw;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;
const ExplainationsContainer = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #1c313a;
  @media (max-width: 425px) {
    width: 100vw;
    height: auto;

    padding-left: 20px;
    padding-right: 20px;
  }
`;
const Explaination = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    padding: 0px 3px 0px 3px;
  }
`;
export default class BuzzWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: 1
    };
  }

  handleInfo = () => {
    switch (this.state.word) {
      case 2:
        return (
          <Explaination>
            <h3>Blockchain</h3>
            <p>
              By popular definition blockchain is decentralized records of
              transactions.
            </p>
            <b>How steemblr is using blockchain?</b>
            <p>
              Every post, comment & vote is published on steem blockchain, this
              allows to monetize actions you take and protects us from
              censorship.
            </p>
          </Explaination>
        );
      case 3:
        return (
          <Explaination>
            <h3>STEEM</h3>
            <p>
              Steem is a social blockchain that grows communities and makes
              immediate revenue streams possible for users by rewarding them for
              sharing content. It’s currently the only blockchain that can power
              real applications via social apps like Steemit.
              <br />
              <br />
              <a
                href="https://steem.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            </p>

            <b>How to get an account?</b>
            <p>
              You can sign up for free
              <a
                href="https://signup.steemit.com/?ref=steemblr"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              or buy one
              <a
                href="https://blocktrades.us/create-steem-account"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>instantly.
            </p>
            <p>
              Need cryptocurrency? Get some
              <a
                href="https://www.coinbase.com/join/5a3670723460ff02f4fc46fe"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            </p>
          </Explaination>
        );
      case 4:
        return (
          <Explaination>
            <h3>Monetization</h3>
            <p>
              Using steem blockchain allowed to monetize actions you take on the
              app.
            </p>
            <b>Voting</b>
            <p>
              By voting on someone else post or comment you are eligible for
              curation rewards. Amount of token you earn depends on these
              factors:
              <ul>
                <li>amount of steem power you have</li>
                <li>how fast did you vote</li>
                <li>how much people voted after you</li>
              </ul>
              Only content which is younger than 7 days is eligible for curation
              reward.
            </p>

            <b>Creating Content</b>
            <p>
              After creating new post or comment people can upvote it and then
              accordingly to their steem power you will get rewards after 7 days
              of content creation.
              <br />
              <br />To sustain itself steemblr is taking 5% of your author
              reward
            </p>
          </Explaination>
        );
      case 5:
        return (
          <Explaination>
            <h3>Steem Wallet</h3>
            <p>
              Since steemblr is still in early stage to make steem related
              transactions head to
              <a
                href="https://steemit.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://steemit.com
              </a>
            </p>
          </Explaination>
        );
      default:
        return (
          <Explaination>
            <h3>Censorship-free</h3>
            <p>
              Steemblr as an entity will never take any ideology/political view
              to disrupt your perception of the community.
            </p>
            <p>
              Altought according to used tags post can be marked as NSFW it will
              never be deleted unless its illegal.
            </p>
          </Explaination>
        );
    }
  };
  render() {
    return (
      <Container id="buzzwords-section">
        <Waypoint onEnter={() => this.props.handleWaypoints(3)} />
        <Grid>
          <ConceptContainer>
            <h2>Buzzwords</h2>
            <button
              onClick={() =>
                this.setState({
                  word: 1
                })
              }
            >
              Censorship-free
            </button>
            <button
              onClick={() =>
                this.setState({
                  word: 2
                })
              }
            >
              Blockchain
            </button>
            <button
              onClick={() =>
                this.setState({
                  word: 3
                })
              }
            >
              Steem
            </button>
            <button
              onClick={() =>
                this.setState({
                  word: 4
                })
              }
            >
              Monetization
            </button>
            <button
              onClick={() =>
                this.setState({
                  word: 5
                })
              }
            >
              Where is my wallet?!
            </button>
          </ConceptContainer>
          <ExplainationsContainer>{this.handleInfo()}</ExplainationsContainer>
        </Grid>
        <Footer />
      </Container>
    );
  }
}
