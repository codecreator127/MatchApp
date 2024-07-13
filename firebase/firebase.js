import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBk1YEc2q0zGyqMh0sHwDLmnLEe-m9Ihw",
  authDomain: "dev-hackathon-2024-34b6e.firebaseapp.com",
  projectId: "dev-hackathon-2024-34b6e",
  storageBucket: "dev-hackathon-2024-34b6e.appspot.com",
  messagingSenderId: "34299250325",
  appId: "1:34299250325:web:0595096ab49b9c14223d9c",
  measurementId: "G-5VXJM49WKM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
