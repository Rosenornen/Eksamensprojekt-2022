// Import the functions you need from the SDKs you need
import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo9r87W770d8WbEN8FwMaGORunnMe9mzw",
  authDomain: "fir-auth-ecfa6.firebaseapp.com",
  databaseURL: "https://fir-auth-ecfa6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-auth-ecfa6",
  storageBucket: "fir-auth-ecfa6.appspot.com",
  messagingSenderId: "322810923339",
  appId: "1:322810923339:web:33a4702bedd7f45cb980ce"
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

export { db, auth, firebase }