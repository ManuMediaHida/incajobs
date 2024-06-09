/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: firebaseConfig.js
 * Descripción: Configuración e inicialización de Firebase para la aplicación IncaJobs.
 ***********************************************/

// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Agrega los SDKs para los productos de Firebase que deseas utilizar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase de tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyDo-L8IpKdazUeD_VHBPUAXiA7rM5AolhM",
  authDomain: "incajobs-92b79.firebaseapp.com",
  projectId: "incajobs-92b79",
  storageBucket: "incajobs-92b79.appspot.com",
  messagingSenderId: "873020635692",
  appId: "1:873020635692:web:b12c4d627daaeee330af89",
  measurementId: "G-0TD5BRMHWD"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };
