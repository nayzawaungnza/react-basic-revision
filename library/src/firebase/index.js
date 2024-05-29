import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbQnY2Qr45DLmGjzl1Wtb4ojQgn9qUGuo",
  authDomain: "library-app-739ac.firebaseapp.com",
  projectId: "library-app-739ac",
  storageBucket: "library-app-739ac.appspot.com",
  messagingSenderId: "729893388849",
  appId: "1:729893388849:web:bfcd1982fe7bf192674b10",
  measurementId: "G-TB488XLBHD",
};
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);
let storage = getStorage(app);
export { db, auth, storage };
