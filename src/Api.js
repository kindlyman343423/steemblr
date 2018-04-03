import sc2 from 'sc2-sdk'

const token = localStorage.getItem('token')
const api = sc2.Initialize({
  app: 'steembler.app',
  callbackURL: 'http://10.0.0.3:3000/redirect', //'http://localhost:3000/redirect'
  accessToken: token === null ? '' : token,
  scope:['login','offline','vote', 'comment', 'comment_delete', 'comment_options', 'custom_json']
})


export default api;