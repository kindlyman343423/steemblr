import React, { Component } from "react";
import styled from "styled-components";
import { defaultStorage } from "../environment";
import SendBtn from "../Components/SendBtn";
import colors from "../styles/colors";
import store from "../store";
import checkBlogURL from "../Functions/checkBlogURL";
const Container = styled.div`
  margin: auto;
  margin-top: 5em;
  border-radius: 20px;
  box-sizing: border-box;
  width: 30vw;

  background-color: #fff;
  color: black;
  text-align: left;
  padding: 25px;
  @media (max-width: 768px) {
    width: 50vw;
  }
  @media (max-width: 425px) {
    width: 85vw;
  }
  @media (max-width: 375px) {
    width: 90vw;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  button {
    align-self: flex-end;
  }
  span {
    box-sizing: border-box;
    align-self: center;
    display: flex;
    margin-bottom: 25px;
    justify-content: center;
    padding: 25px 10px 25px 10px;
    align-items: center;
    width: 90%;
    label {
      margin-right: 10px;
    }
  }
  @media (max-width: 768px) {
    span {
      padding: 10px;
      width: 100%;
    }
  }
  @media (max-width: 425px) {
    span {
      padding: 10px;
      width: 100%;
    }
  }
  @media (max-width: 375px) {
    span {
      padding: 10px;
      width: 100%;
    }
  }
`;
const Errors = styled.p`
  color: red;
`;

const Input = styled.input`

    border: 0;
    outline: 0;
    background: rgba(255, 255, 255, 0.6);
    height: 30px;
    width: 80%;
    font-size: 16px;
    padding-left: 5px;
    transition: 0.2s;
    border-bottom: 1px solid ${colors.borders.inactive};
  }
  &:focus {
    border-bottom: 1px solid ${colors.borders.active};
    transition: 0.4s ease-in;
  }

  @media (max-width: 425px) {
    width: 80%;
  }
 `;
export default class CreateBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false,
      error: ""
    };

    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async getData(props) {
    let bucket = [];
    defaultStorage
      .collection("users")
      .doc(store.getState().steemProfile.profile._id)
      .set(
        {
          blog: {
            avatar: "avatarurl"
          }
        },
        { merge: true }
      );
    await defaultStorage
      .collection("users")
      .doc(store.getState().steemProfile.profile._id)
      .collection("posts")
      .doc("test")
      .get()
      .then(snapshot => {
        bucket.push(snapshot);
      })
      .catch(err => {
        console.log("Error from cloud firestore:" + err);
      });
    return bucket;
  }
  async onChange(e) {
    const name = e.target.name;
    await this.setState({
      [name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const checkTitle = this.checkTitle();
    const checkUrl = this.checkUrl();
    checkBlogURL();
    if (checkTitle && checkUrl) {
      this.setState({
        isError: false
      });
      this.createBlog();
      return void 0;
    } else {
      return void 0;
    }
  }
  createBlog() {
    defaultStorage
      .collection("users")
      .doc(store.getState().steemProfile.profile._id)
      .collection("posts")
      .doc("bcd70a24-ce5a-4e61-8a9e-b82c2249e31c")
      .update({
        blog: "meowmeow"
      });
  }
  checkTitle() {
    const title = this.state.title;
    if (title === undefined || title === "") {
      console.log("Deos it work?");
      this.setState({
        isError: true,
        error: "Title cannot be empty"
      });
      return false;
    } else if (title.length > 255) {
      this.setState({
        isError: true,
        error: "Title is too long"
      });
      return false;
    } else if (title.length < 2) {
      this.setState({
        isError: true,
        error: "Title is too short"
      });
    } else {
      return true;
    }
  }
  checkUrl() {
    const url = this.state.url;
    if (url === undefined) {
      console.log("Undefined Url");
      this.setState({
        isError: true,
        error: "Url cannot be empty"
      });
      return false;
    } else if (url.length > 48) {
      this.setState({
        isError: true,
        error: "Url is too long"
      });
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
      <Container>
        <h1>Create your blog</h1>
        <p>This gonna be your main blog, it can be managed only by you.</p>
        <Errors>{this.state.isError ? this.state.error : void 0}</Errors>
        <Form onSubmit={this.handleSubmit}>
          <span>
            <label for="title">Title:</label>
            <Input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.onChange}
            />
          </span>
          <span>
            <label for="url">URL:</label>
            <Input
              name="url"
              type="text"
              value={this.state.url}
              onChange={this.onChange}
            />
          </span>
          <SendBtn type="submit">Create</SendBtn>
        </Form>
        <button onClick={this.getData}> GET DATA </button>
      </Container>
    );
  }
}
