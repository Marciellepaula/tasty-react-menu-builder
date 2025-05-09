
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "yrt3CFZYhLCAZ9c0KtaFG2XGih4eQ7xtIfxbvt8772Y",
  authDomain: "restaurant-menu-app-34958.firebaseapp.com",
  projectId: "bdtaste",
  storageBucket: "restaurant-menu-app-34958.appspot.com",
  messagingSenderId: "682206367689",
  appId: "1:682206367689:web:7a8c328ba52da679a2c20a",
  measurementId: "G-T49HGBFKX0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
