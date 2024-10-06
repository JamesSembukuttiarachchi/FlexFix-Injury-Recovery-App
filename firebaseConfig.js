// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseConfig.apiKey,
  authDomain: Constants.manifest.extra.firebaseConfig.authDomain,
  projectId: Constants.manifest.extra.firebaseConfig.projectId,
  storageBucket: Constants.manifest.extra.firebaseConfig.storageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseConfig.messagingSenderId,
  appId: Constants.manifest.extra.firebaseConfig.appId,
  measurementId: Constants.manifest.extra.firebaseConfig.measurementId,
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
