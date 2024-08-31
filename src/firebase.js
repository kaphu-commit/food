// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsO1njJxDGM9TPeYvZCSYjiAUi3ihrusA",
  authDomain: "food-delivery-5848d.firebaseapp.com",
  projectId: "food-delivery-5848d",
  storageBucket: "food-delivery-5848d.appspot.com",
  messagingSenderId: "427576140263",
  appId: "1:427576140263:web:a582ac8a43d515776a9d42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth and firestore services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
