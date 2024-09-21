// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "firebase_api_key",
  authDomain: "moti-vibes.firebaseapp.com",
  projectId: "moti-vibes",
  storageBucket: "moti-vibes.appspot.com",
  messagingSenderId: "947486791694",
  appId: "1:947486791694:web:b54bef814322c89e6e045f",
  measurementId: "G-DSL7XZVYV5"
};

const google_auth = new GoogleAuthProvider()

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
{
  const response = await fetch("/firebase_api_key.txt");
  const text = await response.text();
  firebaseConfig.apiKey = text;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {app, db, auth, google_auth, signInWithPopup, signOut }
