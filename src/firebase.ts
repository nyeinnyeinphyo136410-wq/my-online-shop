// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAymQtKCsEh2UbtsNANPLu_0VJta-_G6P4",
  authDomain: "myshop-16c89.firebaseapp.com",
  projectId: "myshop-16c89",
  storageBucket: "myshop-16c89.firebasestorage.app",
  messagingSenderId: "187482834521",
  appId: "1:187482834521:web:f271cce71a107509271348"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);