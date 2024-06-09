// src/components/perfil/PerfilComponent.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: PerfilComponent.jsx
 * Descripción: Este componente alterna entre mostrar el perfil del usuario y permitir la edición del mismo.
 */

import React, { useState } from "react";
import Perfil from "./Perfil";
import EditarPerfil from "./EditarPerfil";

/**
 * Componente para alternar entre la vista de perfil y la edición de perfil.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @returns {JSX.Element} El componente del perfil con opción de edición.
 */
export default function PerfilComponent({ currentUser }) {
  const [isEdit, setisEdit] = useState(false); // Estado para controlar el modo de edición

  /**
   * Alterna el modo de edición.
   */
  const onEdit = () => {
    setisEdit(!isEdit);
  };

  return (
    <div className="profile-component">
      {isEdit ? (
        <EditarPerfil onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <Perfil currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
}
