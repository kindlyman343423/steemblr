const functions = require('firebase-functions');
const admin = require('firebase-admin')


const serviceAccount = require('./serviceAccount.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://steemblr.firebaseio.com"'
  })
  
exports.reciveToken = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', 'https://steemblr.com')
  response.set('Access-Control-Allow-Methods', 'GET, POST')
  
  
  
  const uuid = request.query.uuid
  admin.auth().createCustomToken(uuid)
    .then(function(customToken) {
      const token = {
        'token': customToken
      }

      response.status(200).send(token)
    })

  
})