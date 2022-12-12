// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3kQUo6TAmi5aujc8NY-tSBFN8Qgmr1Lg",
  authDomain: "fir-v1-f2026.firebaseapp.com",
  databaseURL: "https://fir-v1-f2026-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-v1-f2026",
  storageBucket: "fir-v1-f2026.appspot.com",
  messagingSenderId: "91591609747",
  appId: "1:91591609747:web:c005382b45d22c5506ac66"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const auth = firebase.auth()
const db = app.firestore();

export { db, auth }