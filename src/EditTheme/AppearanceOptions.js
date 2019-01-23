import React, { Component } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";

import { connect } from "react-redux";
import store from "../store";
import { editTheme } from "../actions/editTheme";

import FontPicker from "font-picker-react";
import uploadHeader from "../Functions/uploadHeader";
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
  box-sizing: border-box;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const OptionContainerRow = styled.div`
  text-align: left;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  span {
    height: 100%;
    margin: 0;
    svg {
      margin-right: 5px;
    }
  }
`;
const Input = styled.input`
  border: 0;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 10px;
`;
const FileInput = styled.input`
  display: none;
  opacity: 0;
  outline: none;
  cursor: pointer;
`;
const FileInputLabel = styled.label`
  cursor: pointer;
  transition: 500ms ease;
`;
const PickerContainer = styled.div`
  position: fixed;
  z-index: 1200;
`;
const PickerCover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
const PickerBtn = styled.button`
  outline: none;
  cursor: pointer;
  background-color: rgba(
    ${props => props.color.r},
    ${props => props.color.g},
    ${props => props.color.b},
    ${props => props.color.a}
  );
  border: 1px solid black;
  border-radius: 2px;
  width: 20px;
  height: 20px;
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  color: #fff;
  cursor: pointer;
  margin: 0;
`;
class AppearanceOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: this.props.steemAccounts.accounts.filter(acc => {
        return acc.author === this.props.login.username;
      })[0],
      backgroundColor: "",
      titleColor: "",
      titleFont: "Roboto",
      isBackgroundColorPicker: false,
      isTitleColorPicker: false
    };
  }

  handleInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    const props = {
      author: this.props.login.username,
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
  handleTitlePickerOpen = () => {
    this.setState({
      isTitleColorPicker: !this.state.isTitleColorPicker
    });
  };
  handleBackgroundChange = color => {
    this.setState({
      backgroundColor: color.rgb
    });
    const props = {
      author: this.props.login.username,
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
      author: this.props.login.username,
      property: "title_color",
      value: color.rgb
    };
    store.dispatch(editTheme(props));
  };
  handleAvatarShape = shape => {
    const props = {
      author: this.props.login.username,
      property: "avatar_shape",
      value: shape
    };
    store.dispatch(editTheme(props));
  };
  handleFontChange = nextFont => {
    const props = {
      author: this.props.login.username,
      property: "title_font",
      value: {
        family: nextFont.family,
        category: nextFont.category,
        url: nextFont.files.regular.replace("http://", "https://")
      }
    };
    this.setState({
      titleFont: nextFont.family
    });
    store.dispatch(editTheme(props));
  };
  handleCheckbox = e => {
    const props = {
      author: this.props.login.username,
      property: e.target.name,
      value: e.target.checked
    };
    store.dispatch(editTheme(props));
  };
  handleUpload = async e => {
    await uploadHeader(e.target.files[0]).then(response => {
      const props = {
        author: this.props.login.username,
        property: "cover_image",
        value: response
      };
      store.dispatch(editTheme(props));
    });
  };

  render() {
    const { login, steemAccounts } = this.props;
    const account = steemAccounts.accounts.filter(acc => {
      return acc.author === login.username;
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
              type="text"
              value={account.name}
              onChange={this.handleInput}
            />
          </OptionContainer>
          <OptionContainer>
            <span>Description</span>
            <Input
              name="about"
              type="text"
              value={account.about}
              onChange={this.handleInput}
            />
          </OptionContainer>
          <OptionContainerRow>
            <span>Header image</span>
            <FileInputLabel for="file">
              Upload
              <FileInput
                type="file"
                name="show_header_image"
                onChange={this.handleUpload}
              />
            </FileInputLabel>
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Avatar shape</span>
            <span>
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
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Title font</span>
            <FontPicker
              apiKey={process.env.REACT_APP_GOOGLE_FONTS_API}
              activeFont={this.state.titleFont}
              onChange={this.handleFontChange}
            />
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Background color</span>
            <PickerBtn
              color={account.background_color}
              onClick={this.handleBgPickerOpen}
            />

            {this.state.isBackgroundColorPicker ? (
              <PickerContainer>
                <PickerCover onClick={this.handleBgPickerOpen} />
                <SketchPicker
                  color={this.state.backgroundColor}
                  onChangeComplete={this.handleBackgroundChange}
                />
              </PickerContainer>
            ) : null}
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Title color</span>
            <PickerBtn
              color={account.title_color}
              onClick={this.handleTitlePickerOpen}
            />

            {this.state.isTitleColorPicker ? (
              <PickerContainer>
                <PickerCover onClick={this.handleTitlePickerOpen} />
                <SketchPicker
                  color={this.state.titleColor}
                  onChangeComplete={this.handleTitleColorChange}
                />
              </PickerContainer>
            ) : null}
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Show header image</span>
            <Checkbox
              type="checkbox"
              name="show_header_image"
              checked={account.show_header_image}
              onChange={this.handleCheckbox}
            />
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Show avatar</span>
            <Checkbox
              type="checkbox"
              name="show_avatar"
              checked={account.show_avatar}
              onChange={this.handleCheckbox}
            />
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Show title</span>
            <Checkbox
              type="checkbox"
              name="show_title"
              checked={account.show_title}
              onChange={this.handleCheckbox}
            />
          </OptionContainerRow>
          <OptionContainerRow>
            <span>Show description</span>
            <Checkbox
              type="checkbox"
              name="show_description"
              checked={account.show_description}
              onChange={this.handleCheckbox}
            />
          </OptionContainerRow>
        </Section>
      );
    }
  }
}
const mapStateToProps = state => ({
  login: state.login,
  steemAccounts: state.steemAccounts
});
export default connect(
  mapStateToProps,
  {}
)(AppearanceOptions);
