// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "moti-vibes.firebaseapp.com",
  projectId: "moti-vibes",
  storageBucket: "moti-vibes.appspot.com",
  messagingSenderId: "947486791694",
  appId: "1:947486791694:web:b54bef814322c89e6e045f",
  measurementId: "G-DSL7XZVYV5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
