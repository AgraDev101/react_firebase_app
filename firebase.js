import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXUvpeDnkWOGsrw_c8lSuNGQor8cQhfSs",
  authDomain: "full-crud-70b1f.firebaseapp.com",
  projectId: "full-crud-70b1f",
  storageBucket: "full-crud-70b1f.firebasestorage.app",
  messagingSenderId: "586554086367",
  appId: "1:586554086367:web:f8b2416e6654331a22ea6a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)