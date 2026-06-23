import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN9hQiEl5o-8zFPAFNs8czCb0O9F1ODl4",
  authDomain: "ultra-10th-a0a3b.firebaseapp.com",
  projectId: "ultra-10th-a0a3b",
  storageBucket: "ultra-10th-a0a3b.firebasestorage.app",
  messagingSenderId: "1029063788146",
  appId: "1:1029063788146:web:6bbf5928d8eeaa8b9024eb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
