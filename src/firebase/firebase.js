import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//configuration details as an object
const firebaseConfig = {
  apiKey: "AIzaSyCKHrwNd7Bu95OzZ_521IybYmceOmZ3TFI",
  authDomain: "safeheads-20550.firebaseapp.com",
  projectId: "safeheads-20550",
  storageBucket: "safeheads-20550.appspot.com",
  messagingSenderId: "973611030918",
  appId: "1:973611030918:web:83cfc00884af4b25aa3407",
  measurementId: "G-1W3GFL9FT1",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore service
const db = getFirestore(app);

// Initialize Firebase authorization service
const auth = getAuth(app);

export { db, auth };
