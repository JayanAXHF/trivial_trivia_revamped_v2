// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNUP0OOC5f5sRxtccg-0XzXZhYyVaw_wc",
  authDomain: "trivial-trivia-revamped.firebaseapp.com",
  databaseURL:
    "https://trivial-trivia-revamped-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trivial-trivia-revamped",
  storageBucket: "trivial-trivia-revamped.appspot.com",
  messagingSenderId: "281708203113",
  appId: "1:281708203113:web:0ad5f30b7a849c3ea326f8",
  measurementId: "G-1CF9M4WNB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
