import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";
import colors from "../styles/colors";
import { connect } from "react-redux";
import editUserSettings from "../actions/editUserSettings";
import saveUserSettings from "../Functions/Firebase/saveUserSettings";
import { toast } from "react-toastify";
const Container = styled.div`
  position: relative;
  text-align: left;
  height: 100%;
  b {
    font-weight: 500;
  }
`;
const Option = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 30% auto;
  p {
    color: ${colors.font.normal};
    font-size: 12px;
  }
  @media (max-width: 425px) {
    grid-template-columns: 40% auto;
  }
`;
const SaveBtn = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  outline: none;
  padding: 10px;
  border: 0;
  background-color: ${colors.buttons.login};
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:focus {
    background-color: #1c313a;
    transition: 0.5s;
  }
`;
class Account extends Component {
  state = {
    isNSFWAllowed: !this.props.userSettings.isNSFWAllowed
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });

    const props = {
      property: "isNSFWAllowed",
      value: !event.target.checked
    };
    this.props.editUserSettings(props);
  };
  save = async () => {
    await saveUserSettings();
    toast.info("Successfully saved!");
  };
  render() {
    return (
      <Container>
        <Option>
          <b>Filtering</b>
          <span>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isNSFWAllowed}
                  color="primary"
                  value="isNSFWAllowed"
                  onChange={this.handleChange("isNSFWAllowed")}
                />
              }
              label="Safe mode"
            />
            <p>Hides adult content from app.</p>
          </span>
        </Option>
        <SaveBtn onClick={this.save}>Save</SaveBtn>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userSettings: state.userSettings
});

export default connect(mapStateToProps, { editUserSettings })(Account);
