import React, { Component } from "react";
import styled from "styled-components";
import Spinner from "../Components/Spinner";
import { connect } from "react-redux";
import createProfile from "../Functions/createProfile";
import checkProfile from "../Functions/Firebase/checkProfile";
import delay from "../Functions/delay";
import getUserSettings from "../actions/getUserSettings";
const Container = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #3f51b5;
  p {
    color: #fff;
    text-transform: uppercase;
  }
`;
class FirstLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      created: false
    };
    this.handleProfileCreate();
  }

  async handleProfileCreate() {
    if (this.props.steemProfile.profile._id === undefined) {
      await delay(200);
      this.handleProfileCreate();
    } else {
      await createProfile(this.props.steemProfile.profile._id);
      checkProfile(this.props.steemProfile.profile._id).then(value => {
        if (value) {
          this.props.getUserSettings();
          this.props.handleClose();
        } else {
          this.handleProfileCreate();
        }
      });
    }
  }
  render() {
    return (
      <Container>
        <Spinner />
        <p>Creating your profile</p>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  steemProfile: state.steemProfile
});
export default connect(
  mapStateToProps,
  { getUserSettings }
)(FirstLoad);
