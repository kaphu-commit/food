// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, runTransaction, setDoc, addDoc, collection, getDocs ,where , query} from 'firebase/firestore'; // Added getDocs here
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsO1njJxDGM9TPeYvZCSYjiAUi3ihrusA',
  authDomain: 'food-delivery-5848d.firebaseapp.com',
  projectId: 'food-delivery-5848d',
  storageBucket: 'food-delivery-5848d.appspot.com',
  messagingSenderId: '427576140263',
  appId: '1:427576140263:web:a582ac8a43d515776a9d42'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const firestore = getFirestore(app);
const auth = getAuth(app); // Initialize Auth

// Export Firestore, Auth, and utility functions
export { firestore, auth, doc, getDoc, runTransaction, setDoc, addDoc, collection, getDocs , where ,query}; // Added getDocs here
