
import firebase from 'firebase'



const firebaseAuth = async () => {
  firebase.auth().signInWithCustomToken(localStorage.getItem('cToken')).catch(function(error) {

  })
}



export default firebaseAuth