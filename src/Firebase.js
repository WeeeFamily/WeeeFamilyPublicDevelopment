// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/analytics'
// import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyALmz_iK6vTBCsuyzjBkXJtrGaXqyBIOnc",
  authDomain: "weee-company.firebaseapp.com",
  projectId: "weee-company",
  storageBucket: "weee-company.appspot.com",
  messagingSenderId: "615215622416",
  appId: "1:615215622416:web:398d3dfd33b02c1f8edd95",
  measurementId: "G-GCQLKKL67W"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};