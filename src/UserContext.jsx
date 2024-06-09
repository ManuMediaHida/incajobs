/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: UserContext.jsx
 * Descripción: Define el contexto del usuario y su proveedor.
 ***********************************************/

import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { obtenerUsuarioActualPorEmail } from "./server/Firestore";

// Creación del contexto de usuario
export const UserContext = createContext();

// Proveedor del contexto de usuario
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Estado para el usuario actual
  const [loading, setLoading] = useState(true); // Estado de carga

  // Efecto para manejar los cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await obtenerUsuarioActualPorEmail(user.email); // Obtener datos del usuario
        setCurrentUser(userData); // Establecer el usuario actual
      } else {
        setCurrentUser(null); // Si no hay usuario, establecer null
      }
      setLoading(false); // Finalizar el estado de carga
    });

    return () => unsubscribe(); // Limpiar el efecto
  }, []);

  // Proveer el valor del contexto a los componentes hijos
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
