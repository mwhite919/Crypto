import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  return { app, auth, firestore };
}

export function signup(email, password) {
  const { auth } = initializeFirebase();
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  const { auth } = initializeFirebase();
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  const { auth } = initializeFirebase();
  return signOut(auth);
}

export default function getFirebaseFirestore() {
  const { firestore } = initializeFirebase();
  return firestore;
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const { auth } = initializeFirebase();
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, []);

  return currentUser;
}
