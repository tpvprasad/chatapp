import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARXl8lI0ijRe6pUaCgjhjd3bUc8i3Xkqo",
  authDomain: "chat-app-a019e.firebaseapp.com",
  projectId: "chat-app-a019e",
  storageBucket: "chat-app-a019e.appspot.com",
  messagingSenderId: "47914744513",
  appId: "1:47914744513:web:ad5f634c348e60707db240"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
