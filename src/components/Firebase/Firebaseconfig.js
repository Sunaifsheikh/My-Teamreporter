import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged  } from "firebase/auth";


const Firebaseconfig = {
    apiKey: "AIzaSyAIZCuzdhuZbqMXOJU2k3affIHMPEHg6bg",
    authDomain: "team-manager-7d64c.firebaseapp.com",
    projectId: "team-manager-7d64c",
    storageBucket: "team-manager-7d64c.appspot.com",
    messagingSenderId: "568519998106",
    appId: "1:568519998106:web:8a71b4ba64917db8637d23",
    measurementId: "G-0JMQ723HW7"
  };

const app = initializeApp(Firebaseconfig);
const auth = getAuth(app);
const db = getFirestore(app);
const stateChange = onAuthStateChanged;

export { db, Firebaseconfig, auth, stateChange };
