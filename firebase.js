// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfqgRkhJ5XzbLs6cjIzcPumLnrZnaBt9o",
  authDomain: "bookager-71f8b.firebaseapp.com",
  projectId: "bookager-71f8b",
  storageBucket: "bookager-71f8b.appspot.com",
  messagingSenderId: "314643991465",
  appId: "1:314643991465:web:aef401610d14d5934c92b8",
  measurementId: "G-8KH0WF1YNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);