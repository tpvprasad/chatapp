import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtIkmfEynjjLuAGwnXfjlZy2TkDVqO5d8",
  authDomain: "fir-course-f33c9.firebaseapp.com",
  databaseURL: "https://fir-course-f33c9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-course-f33c9",
  storageBucket: "fir-course-f33c9.appspot.com",
  messagingSenderId: "1047923384476",
  appId: "1:1047923384476:web:cf5d41f1b8378cbef3cd59",
  measurementId: "G-TB9XCV4ND2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
