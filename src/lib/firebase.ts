


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP8Hf-AJPr07Nb3ep6lXzUV-plkZ889cQ",
  authDomain: "bdtaste.firebaseapp.com",
  projectId: "bdtaste",
  storageBucket: "bdtaste.firebasestorage.app",
  messagingSenderId: "10925316678",
  appId: "1:10925316678:web:4f7c30e2797c059152c847",
  measurementId: "G-GT1Z1SR7QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);