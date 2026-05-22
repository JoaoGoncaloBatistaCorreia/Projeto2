import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDD1SMzfYOxYiorLhxVWJPcCwi1iGRs34",
  authDomain: "frontend-b0a26.firebaseapp.com",
  projectId: "frontend-b0a26",
  storageBucket: "frontend-b0a26.firebasestorage.app",
  messagingSenderId: "43346982809",
  appId: "1:43346982809:web:e1781758d322ac7f8ac508",
  measurementId: "G-WFDE7V7CYZ"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

