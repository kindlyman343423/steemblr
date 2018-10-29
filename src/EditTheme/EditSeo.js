import React, { Component } from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { Link } from "react-router-dom";
import store from "../store";
import { connect } from "react-redux";
import { editTheme } from "../actions/editTheme";
import { getAccounts } from "../actions/getAccounts";
import saveTheme from "../Functions/saveTheme";
const Container = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  margin: 20px;
  height: 70vh;
  padding: 25px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 500;
    margin-top: 0;
    text-align: left;
    border-bottom: 1px solid black;
  }
  @media (max-width: 425px) {
    margin-left: 5px;
  }
`;
const Form = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
  b {
    margin-bottom: 5px;
    font-weight: 500;
  }
  label {
    margin-top: 10px;
    margin-bottom: 20px;
    font-weight: 300;
    max-width: 400px;
  }
  input {
    padding: 5px;
    outline: none;
    max-width: 400px;
  }
  select {
    width: 300px;
    max-width: 400px;
  }
`;
const ExitBtn = styled.button`
  outline: none;
  padding: 10px;
  border: 0;
  background-color: #808e95;
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
const SaveBtn = styled.button`
  outline: none;
  padding: 10px;
  border: 0;
  background-color: ${props =>
    props.isSaved ? "green" : colors.buttons.login};
  outline: none;
  color: white;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
`;
const BtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
`;
class EditSeo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: "",
      isSaved: false,
      isSending: false
    };
    this.loadAccount();
  }

  async loadAccount() {
    await store.dispatch(getAccounts([this.props.match.params.username]));
    const search = store.getState().steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.match.params.username;
    });
    this.setState({
      account: search[0],
      title: search[0].seo !== undefined ? search[0].seo.title : "",
      description: search[0].seo !== undefined ? search[0].seo.description : ""
    });
  }
  async handleForm(e) {
    e.preventDefault();
    await this.setState({
      isSending: true
    });
    const props = {
      author: this.props.steemProfile.profile._id,
      property: "seo",
      value: {
        title: this.state.title,
        description: this.state.description
      }
    };
    await store.dispatch(editTheme(props));
    const account = this.props.steemAccounts.accounts.filter(acc => {
      return acc.author === this.props.steemProfile.profile._id;
    })[0];
    const toSave = {
      user: this.props.steemProfile.profile._id,
      layout: account
    };
    await saveTheme(toSave);
    this.setState({
      isSaved: true,
      isSending: false
    });
  }
  handleChange(e) {
    this.setState({
      isSaved: false
    });
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.account === undefined) {
      return <p>Loading...</p>;
    } else {
      return (
        <Container>
          <Header>
            <h1>Seo Editor</h1>
          </Header>
          <Form onSubmit={e => this.handleForm(e)}>
            <b>Title:</b>
            <input
              placeholder="Your blog seo title"
              name="title"
              minLength="5"
              maxlength="70"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
              required
            />

            <label htmlFor="title">
              Title will be shown in browser card, favorites and in search
              engine result. It should be between 5-70 characters.
            </label>
            <b>Description:</b>
            <input
              placeholder="description"
              name="description"
              maxlength="170"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
              required
            />
            <label htmlFor="description">
              Description of your blog shown in search engine result. It should
              be between 150-160 characters.
            </label>
            <BtnsContainer>
              <Link to="/settings/customize">
                <ExitBtn type="button">Exit</ExitBtn>
              </Link>
              <span>
                <SaveBtn type="submit" isSaved={this.state.isSaved}>
                  {this.state.isSaved ? "Saved" : "Save"}
                </SaveBtn>
              </span>
            </BtnsContainer>
          </Form>
        </Container>
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
)(EditSeo);
