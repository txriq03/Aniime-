// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkHtyPM0HO01mq-dtLlV55Xc4VUnpInow",
  authDomain: "aniime-13722.firebaseapp.com",
  projectId: "aniime-13722",
  storageBucket: "aniime-13722.appspot.com",
  messagingSenderId: "630806340518",
  appId: "1:630806340518:web:1e5e0e0e473d9051f8a567",
  measurementId: "G-QV617NCS0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;