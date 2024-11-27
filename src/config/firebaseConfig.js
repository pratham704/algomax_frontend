import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUW43DZ4b77R01wI5m8IqYnEJn7p4e6vc",
    authDomain: "algomaxeventmanagement.firebaseapp.com",
    projectId: "algomaxeventmanagement",
    storageBucket: "algomaxeventmanagement.firebasestorage.app",
    messagingSenderId: "366173816288",
    appId: "1:366173816288:web:81a500c1ccce36254c1785",
    measurementId: "G-MNDE61N3ZC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };