// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPlOxyd8Yb7D_0o_6tgg0xQhsTZq4xfnY",
  authDomain: "stackoverflow-609d0.firebaseapp.com",
  projectId: "stackoverflow-609d0",
  storageBucket: "stackoverflow-609d0.appspot.com",
  messagingSenderId: "649365839146",
  appId: "1:649365839146:web:c29548edc0046725739253",
  measurementId: "G-24YYM14LRX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
// export default db;