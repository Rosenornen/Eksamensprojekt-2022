// Import the functions you need from the SDKs you need
import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnblA0xeP2VdHZk9gthPhmISj-OuCWPEU",
  authDomain: "foodbee-v2.firebaseapp.com",
  databaseURL: "https://foodbee-v2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foodbee-v2",
  storageBucket: "foodbee-v2.appspot.com",
  messagingSenderId: "535982426900",
  appId: "1:535982426900:web:ed81da24f44fdc8570d001",
  measurementId: "G-L7C72756PH"
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