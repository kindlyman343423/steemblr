//import admin from 'firebase-admin'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
const environment = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

const defaultApp = firebase.initializeApp(environment);
export const defaultStorage = firebase.firestore();
export const firebaseStorage = firebase.storage();
const settings = { timestampsInSnapshots: true };
defaultStorage.settings(settings);
export default defaultApp;
