import React, { Component } from "react";
import { Waypoint } from "react-waypoint";
import styled from "styled-components";
import colors from "../styles/colors";
import Icon from "react-icons-kit";
import { ic_camera_alt } from "react-icons-kit/md/ic_camera_alt";
import { ic_format_quote } from "react-icons-kit/md/ic_format_quote";
import { ic_format_align_left } from "react-icons-kit/md/ic_format_align_left";
import { ic_music_note } from "react-icons-kit/md/ic_music_note";
import { ic_videocam } from "react-icons-kit/md/ic_videocam";

const Container = styled.section`
  color: #fff;
  background: #38006b;
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  h1 {
    font-weight: 500;
  }
  p {
    max-width: 500px;
  }
  z-index: 4;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconContainer = styled.span`
  background: #fff;
  svg: {
    margin-right: 0px;
  }
  span: {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  border-radius: 5px;
  color: black;
  text-align: center;
  padding: 15px;
  margin: 20px;
  transition: 0.5s;
`;

export default class About extends Component {
  render() {
    return (
      <Container id="about-section">
        <Waypoint onEnter={() => this.props.handleWaypoints(2)} />
        <FirstRow>
          <IconContainer style={{ color: colors.postTypes.text }}>
            <Icon icon={ic_format_align_left} size={48} />
          </IconContainer>
          <IconContainer style={{ color: colors.postTypes.photos }}>
            <Icon icon={ic_camera_alt} size={48} />
          </IconContainer>
          <IconContainer style={{ color: colors.postTypes.quote }}>
            <Icon icon={ic_format_quote} size={48} />
          </IconContainer>
        </FirstRow>
        <SecondRow>
          <IconContainer style={{ color: colors.postTypes.audio }}>
            <Icon icon={ic_music_note} size={48} />
          </IconContainer>
          <IconContainer style={{ color: colors.postTypes.video }}>
            <Icon icon={ic_videocam} size={48} />
          </IconContainer>
        </SecondRow>

        <div>
          <h1>What is steemblr?</h1>
          <p>
            Censorship-free monetized microblogging platform powered by steem
            blockchain. Here you can share your thoughts, photos, gifs, music
            and videos. Everything you are all about.
          </p>

          <p>Just log in with steem account and start blogging</p>
        </div>
      </Container>
    );
  }
}
