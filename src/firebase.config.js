// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSYoSA2-YV9bdAz--q-Hjk-VbXEenO5D8",
  authDomain: "kharcha-pani-20de3.firebaseapp.com",
  projectId: "kharcha-pani-20de3",
  storageBucket: "kharcha-pani-20de3.appspot.com",
  messagingSenderId: "124454812484",
  appId: "1:124454812484:web:aa5bef5deca1e521877511"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };