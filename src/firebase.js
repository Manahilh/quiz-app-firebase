import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5A0ZF9YvEuO0GkMzb4Xf401Ired08bFc",
  authDomain: "quiz-app-authentication-c8614.firebaseapp.com",
  databaseURL: "https://quiz-app-authentication-c8614-default-rtdb.firebaseio.com",
  projectId: "quiz-app-authentication-c8614",
  storageBucket: "quiz-app-authentication-c8614.firebasestorage.app",
  messagingSenderId: "858090141862",
  appId: "1:858090141862:web:7a37760304689bd8445c67",
  measurementId: "G-MM2RVYW9YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };