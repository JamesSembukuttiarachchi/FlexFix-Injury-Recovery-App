// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvAtLeZdI1J5u92414a15FdV7-RlbNWvo",
  authDomain: "flexfix-366ff.firebaseapp.com",
  projectId: "flexfix-366ff",
  storageBucket: "flexfix-366ff.appspot.com",
  messagingSenderId: "760494243623",
  appId: "1:760494243623:web:880e2cfddfa784330f7302",
  measurementId: "G-HXXK388MWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage };
