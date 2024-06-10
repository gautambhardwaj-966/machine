// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlLMm5eS3G9q4HcWxzbRZjpI0ZbOC8irY",
  authDomain: "machine-b8b4d.firebaseapp.com",
  projectId: "machine-b8b4d",
  storageBucket: "machine-b8b4d.appspot.com",
  messagingSenderId: "931421063614",
  appId: "1:931421063614:web:361a17ba25b7a1755bd1ef",
  measurementId: "G-3DSZ4XK29K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();