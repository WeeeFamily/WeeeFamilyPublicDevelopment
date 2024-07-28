// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALmz_iK6vTBCsuyzjBkXJtrGaXqyBIOnc",
  authDomain: "weee-company.firebaseapp.com",
  projectId: "weee-company",
  storageBucket: "weee-company.appspot.com",
  messagingSenderId: "615215622416",
  appId: "1:615215622416:web:398d3dfd33b02c1f8edd95",
  measurementId: "G-GCQLKKL67W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Получение экземпляра Firestore и Auth
const db = getFirestore(app);

export { db};