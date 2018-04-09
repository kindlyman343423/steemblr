const functions = require('firebase-functions');
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

/* exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('Access-Control-Allow-Methods', 'GET, POST')
    const json = {
      "Profile": "Simony"
    }
    return response.status(200).send(json)
  
}); */

const serviceAccount = require('./serviceAccount.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://steady-dryad-163918.firebaseio.com'
  })
  
exports.reciveToken = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('Access-Control-Allow-Methods', 'GET, POST')
  
  
  
  const uuid = request.query.uuid
  admin.auth().createCustomToken(uuid)
    .then(function(customToken) {
      const token = {
        'token': customToken
      }

      response.status(200).send(token)
      console.log(token)
    })

  
})