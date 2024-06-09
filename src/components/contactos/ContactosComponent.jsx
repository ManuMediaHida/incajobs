// src/components/contactos/ContactosComponent.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ContactosComponent.jsx
 * Descripción: Este componente muestra una lista de todos los usuarios y permite añadir conexiones entre ellos.
 */

import React, { useEffect, useState, useContext, useCallback } from "react";
import { obtenerTodosLosUsuarios, añadirConexion } from "../../server/Firestore";
import ConnectedUsers from "./Contacto";
import { UserContext } from "../../UserContext";

/**
 * Componente para gestionar y mostrar la lista de contactos.
 *
 * @returns {JSX.Element} El componente de contactos.
 */
export default function ContactosComponent() {
  const [users, setUsers] = useState([]); 
  const { currentUser, loading } = useContext(UserContext); 

  /**
   * Función para añadir una conexión entre el usuario actual y otro usuario.
   *
   * @param {string} id - El ID del usuario con el que se quiere conectar.
   */
  const getCurrentUser = useCallback(
    (id) => {
      if (currentUser?.id) {
        añadirConexion(currentUser.id, id);
      } else {
        console.error("ID del usuario actual no está definido");
      }
    },
    [currentUser]
  );

  useEffect(() => {
    obtenerTodosLosUsuarios(setUsers);
  }, []);

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (!currentUser) {
    return <div>No se encontró ningún usuario.</div>;
  }

  return users.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center p-4 pt-20 m-4 mt-0 border border-gray-400 bg-white rounded-lg md:ml-[16rem]">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <React.Fragment key={user.id}></React.Fragment>
        ) : (
          <ConnectedUsers
            key={user.id}
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center p-4 pt-20 m-4 mt-0 border border-gray-400 bg-white rounded-lg md:ml-[16rem]">
      ¡No hay conexiones para agregar!
    </div>
  );
}
