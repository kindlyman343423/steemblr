import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";
import colors from "../styles/colors";
const Container = styled.div`
  text-align: left;
  b {
    font-weight: 500;
  }
`;
const Option = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 20% auto;
  p {
    color: ${colors.font.normal};
    font-size: 12px;
  }
`;

export default class Account extends Component {
  state = {
    isNSFWAllowed: false
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
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
      </Container>
    );
  }
}
