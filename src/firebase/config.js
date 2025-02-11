// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1mLb7EZyMi4_3UjRwHupoHmfIZ1HMyCk",
  authDomain: "skinpro-e222f.firebaseapp.com",
  projectId: "skinpro-e222f",
  storageBucket: "skinpro-e222f.firebasestorage.app",
  messagingSenderId: "21006521704",
  appId: "1:21006521704:web:a2d98067a263a6204e72dd",
  measurementId: "G-7F3W6EGEZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;