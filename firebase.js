// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiM3nMVcXBaoCaUwQsLFxE0czg5l0qTt8",
  authDomain: "opdracht6-d7ec9.firebaseapp.com",
  projectId: "opdracht6-d7ec9",
  storageBucket: "opdracht6-d7ec9.appspot.com",
  messagingSenderId: "372114702246",
  appId: "1:372114702246:web:c4ab2e91c6acb05175d967",
  measurementId: "G-N7HLK9ENTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };