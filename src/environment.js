//import admin from 'firebase-admin'
import firebase from "firebase";
import "firebase/firestore";

//firebase api key
const environment = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const defaultApp = firebase.initializeApp(environment);
export const defaultStorage = firebase.firestore();
export default defaultApp;
