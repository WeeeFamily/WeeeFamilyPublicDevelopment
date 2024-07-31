import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Импортируйте Storage


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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); // Инициализируйте Storage
export { db, storage };