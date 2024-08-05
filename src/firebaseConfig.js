import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOPEu_wVwcedpHXZpk0J2eYc-8wRfOHcw",
  authDomain: "vital-conexion.firebaseapp.com",
  projectId: "vital-conexion",
  storageBucket: "vital-conexion.appspot.com",
  messagingSenderId: "215658337163",
  appId: "1:215658337163:web:6aebedb9375d1908c8158e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };