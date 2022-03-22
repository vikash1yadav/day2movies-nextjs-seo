import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1pSm115V3baGccaCQBCEqVOyyxV70OHo",
  authDomain: "disneyclonevky.firebaseapp.com",
  projectId: "disneyclonevky",
  storageBucket: "disneyclonevky.appspot.com",
  messagingSenderId: "559456104267",
  appId: "1:559456104267:web:6ada8a02543a58d6ddc2ce",
  measurementId: "G-5XL1V3SYSD"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
