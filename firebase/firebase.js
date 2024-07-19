import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIy6TuU_pjckMVEW68ATlIHvySq7XGgsQ",
  authDomain: "bnh-app.firebaseapp.com",
  projectId: "bnh-app",
  storageBucket: "bnh-app.appspot.com",
  messagingSenderId: "436252984331",
  appId: "1:436252984331:web:710addeb885ad7f17db30e",
  measurementId: "G-TY2ZMXB7BV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
