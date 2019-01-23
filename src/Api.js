import sc2 from "sc2-sdk";

const token = localStorage.getItem("steemToken");
// prettier-ignore
const api = sc2.Initialize({
  app: 'steembler.app',
  baseURL: 'https://steemconnect.com',
  callbackURL: process.env.REACT_APP_LOGIN_URL,
  accessToken: token === null ? '' : token,
  scope:['login', 'offline', 'vote', 'comment', 'comment_options', 'custom_json']
})

export default api;
