// src/api/Auth.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Auth.jsx
 * Descripción: Archivo que contiene las funciones de autenticación con Firebase para el manejo de usuarios.
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, query, where, getDocs, collection  } from "firebase/firestore"; 
import { auth, firestore } from "../firebaseConfig";

const db = getFirestore();

// Función para iniciar sesión con email y contraseña
export const iniciarSesion = async (email, password) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

// Función para registrar un nuevo usuario con email y contraseña
export const registrarUsuario = async (email, password) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

// Función para enviar un correo de verificación al usuario
export const enviarVerificacionEmail = async (user) => {
  try {
    await sendEmailVerification(user);
  } catch (err) {
    console.log("Error al enviar correo de verificación", err);
  }
};

// Función para enviar un correo para resetear la contraseña
export const enviarReinicioContrasena = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error("Error al enviar correo de reinicio de contraseña", err);
  }
};

// Función para cerrar la sesión del usuario
export const cerrarSesion = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    return err;
  }
};

// Función para obtener el usuario actualmente logueado
export const obtenerUsuarioActual = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser({
        userID: user.uid,
        email: user.email,
      });
    } else {
      setCurrentUser(null);
    }
  });
};

// Función para verificar si el usuario es una empresa
export const isUserCompany = async (email) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      console.log("Rol del usuario:", userDoc.data().role); 
      return userDoc.data().role === 'empresa'; 
    }
    console.log("El usuario no existe en la base de datos");
    return false;
  } catch (err) {
    console.error('Error verificando el rol del usuario:', err);
    return false;
  }
};
