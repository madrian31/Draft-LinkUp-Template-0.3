import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOkr6iTk7S0UglvXkvIDYapsmPOdT7iks",
  authDomain: "test-3c4b6.firebaseapp.com",
  projectId: "test-3c4b6",
  storageBucket: "test-3c4b6.firebasestorage.app",
  messagingSenderId: "623818364036",
  appId: "1:623818364036:web:38dd0c711bd65f2e73ded1",
  measurementId: "G-ZZTNB3V8FL",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);