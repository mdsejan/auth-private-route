import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const all = import.meta.env


const firebaseConfig = {
    apiKey: all.VITE_apiKey,
    authDomain: all.VITE_authDomain,
    projectId: all.VITE_projectId,
    storageBucket: all.VITE_storageBucket,
    messagingSenderId: all.VITE_messagingSenderId,
    appId: all.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;