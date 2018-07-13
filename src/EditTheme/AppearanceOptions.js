import React, { Component } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { connect } from "react-redux";
import store from "../store";
import { editTheme } from "../actions/editTheme";

import { Icon } from "react-icons-kit";
import { checkboxUnchecked } from "react-icons-kit/icomoon/checkboxUnchecked";
import { radioUnchecked } from "react-icons-kit/icomoon/radioUnchecked";

const Section = styled.section`
  box-sizing: border-box;
  margin: 10px;
  padding: 10px;
  background-color: #fff;

  span {
    margin-bottom: 10px;
    font-weight: 500;
  }
  input {
    outline: none;
  }
`;
const OptionContainer = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Input = styled.input`
  border: 0;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 10px;
`;

class AppearanceOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: this.props.steemAccounts.accounts.filter(acc => {
        return acc.author === this.props.steemProfile.profile._id;
      })[0],
      backgroundColor: "",
      titleColor: "",
      isBackgroundColorPicker: false
    };
  }

  handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    const props = {
      author: this.props.steemProfile.profile._id,
      property: name,
      value: value
    };
    store.dispatch(editTheme(props));
  };
  handleBgPickerOpen = () => {
    this.setState({
      isBackgroundColorPicker: !this.state.isBackgroundColorPicker
    });
  };
  handleBackgroundChange = color => {
    this.setState({
      backgroundColor: color.rgb
    });
    const props = {
      author: this.props.steemProfile.profile._id,
      property: "background_color",
      value: color.rgb
    };
    store.dispatch(editTheme(props));
  };
  handleTitleColorChange = color => {
    this.setState({
      titleColor: color.rgb
    });
    const props = {
      author: this.props.steemProfile.profile._id,
      property: "title_color",
      value: color.rgb
    };
    store.dispatch(editTheme(props));
  };
  handleAvatarShape = shape => {
    const props = {
      author: this.props.steemProfile.profile._id,
      property: "avatar_shape",
      value: shape
    };
    store.dispatch(editTheme(props));
  };
  render() {
    const account = this.props.steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.steemProfile.profile._id;
    })[0];
    if (account === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <Section>
          <OptionContainer>
            <span>Title</span>
            <Input
              name="name"
              value={account.name}
              onChange={this.handleInput}
            />
          </OptionContainer>
          <OptionContainer>
            <span>Description</span>
            <Input
              name="about"
              value={account.about}
              onChange={this.handleInput}
            />
          </OptionContainer>
          <OptionContainer>
            <span>
              Avatar shape{" "}
              <Icon
                style={{
                  color: account.avatar_shape === "square" ? "#0068FF" : "black"
                }}
                icon={checkboxUnchecked}
                onClick={() => this.handleAvatarShape("square")}
              />
              <Icon
                style={{
                  color: account.avatar_shape === "circle" ? "#0068FF" : "black"
                }}
                icon={radioUnchecked}
                onClick={() => this.handleAvatarShape("circle")}
              />
            </span>
          </OptionContainer>
          <OptionContainer>
            <span>Title font</span>
          </OptionContainer>
          <OptionContainer>
            <span>
              Background color
              <SketchPicker
                color={this.state.backgroundColor}
                onChangeComplete={this.handleBackgroundChange}
              />
            </span>
          </OptionContainer>
          <OptionContainer>
            <span>
              Title color
              <SketchPicker
                color={this.state.titleColor}
                onChangeComplete={this.handleTitleColorChange}
              />
            </span>
          </OptionContainer>
          <OptionContainer>
            <span>Show header image</span>
          </OptionContainer>
          <OptionContainer>
            <span>Show avatar</span>
          </OptionContainer>
          <OptionContainer>
            <span>Show title</span>
          </OptionContainer>
          <OptionContainer>
            <span>Show description</span>
          </OptionContainer>
        </Section>
      );
    }
  }
}
const mapStateToProps = state => ({
  steemProfile: state.steemProfile,
  steemAccounts: state.steemAccounts
});
export default connect(
  mapStateToProps,
  {}
)(AppearanceOptions);
