import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyCXimqAwzQ4OM6GApoqwKA_SP3FCTX9tdY",
  authDomain: "documentapp-reactquill.firebaseapp.com",
  projectId: "documentapp-reactquill",
  storageBucket: "documentapp-reactquill.firebasestorage.app",
  messagingSenderId: "350970066648",
  appId: "1:350970066648:web:9ee40094fb7bc1001609ad",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);