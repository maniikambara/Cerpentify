// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// For development, you can use emulators (optional)
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }

export default app;