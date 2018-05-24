import sc2 from "sc2-sdk";

const token = localStorage.getItem("token");
// prettier-ignore
const api = sc2.Initialize({
  app: 'steembler.app',
  callbackURL: 'http://localhost:3000/redirect', //'
  //callbackURL: 'https://steemblr.com/redirect',
  accessToken: token === null ? '' : token,
  scope:['login', 'offline', 'vote', 'comment', 'comment_options', 'custom_json']
})

export default api;
