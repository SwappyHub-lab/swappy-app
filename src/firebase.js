import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDVIFrJphdsgiqLb4IHxV65f2IXAxz12L0",
    authDomain: "swappy-hub-webapp.firebaseapp.com",
    projectId: "swappy-hub-webapp",
    storageBucket: "swappy-hub-webapp.firebasestorage.app",
    messagingSenderId: "85179159865",
    appId: "1:85179159865:web:2b4db966592a78cf3404e8",
    measurementId: "G-NL0C4Z22L5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app); // ADD THIS
const auth = getAuth(app);

export { db, storage, auth };

