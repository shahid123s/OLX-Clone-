import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDpyu8u1HSqQU3jUOQODbYoeU6X2TTUbZY",
  authDomain: "olx-clone-14370.firebaseapp.com",
  projectId: "olx-clone-14370",
  storageBucket: "olx-clone-14370.appspot.com",
  messagingSenderId: "624509101335",
  appId: "1:624509101335:web:9ecf307594ffd98b76c352",
  measurementId: "G-KW47VB2KLX"
};

const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const storage = getStorage(app)


export const db = getFirestore(app);