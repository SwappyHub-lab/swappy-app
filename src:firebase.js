// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVIFrJphdsgiqLb4IHxV65f2IXAxz12L0",
  authDomain: "swappy-hub-webapp.firebaseapp.com",
  projectId: "swappy-hub-webapp",
  storageBucket: "swappy-hub-webapp.firebasestorage.app",
  messagingSenderId: "85179159865",
  appId: "1:85179159865:web:2b4db966592a78cf3404e8",
  measurementId: "G-NL0C4Z22L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);