
import firebase from 'firebase'



const firebaseAuth = async () => {
  firebase.auth().signInWithCustomToken(localStorage.getItem('cToken')).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  })
}



export default firebaseAuth