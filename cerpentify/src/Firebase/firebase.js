// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASnVKcPgQuzTG8xUTHyZWM4MC4sz1d0uE",
    authDomain: "cerpentify-web.firebaseapp.com",
    databaseURL: "https://cerpentify-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cerpentify-web",
    storageBucket: "cerpentify-web.firebasestorage.app",
    messagingSenderId: "497939114231",
    appId: "1:497939114231:web:93254fd2d7f4d8ad720bf2",
    measurementId: "G-9KB7GQPEE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };