// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfyybV8n405ObF8tiG67LxiH8Yx7VeCWw",
  authDomain: "innoversite-57620.firebaseapp.com",
  projectId: "innoversite-57620",
  storageBucket: "innoversite-57620.firebasestorage.app",
  messagingSenderId: "Y37831820343",
  appId: "1:37831820343:web:6c33d7f431a8c6989cebb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);