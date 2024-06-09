// src/components/perfil/Perfil.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Perfil.jsx
 * Descripción: Este componente muestra el perfil del usuario actual y permite editarlo.
 */

import React, { useState, useContext } from "react";
import EditarPerfil from "./EditarPerfil";
import { UserContext } from "../../UserContext";

/**
 * Componente para mostrar y editar el perfil del usuario.
 *
 * @returns {JSX.Element} El componente del perfil del usuario.
 */
export default function Perfil() {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const [isEditing, setIsEditing] = useState(false); 

  /**
   * Alterna el modo de edición.
   */
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  /**
   * Maneja la actualización del perfil del usuario.
   *
   * @param {Object} updatedUser 
   */
  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser); 
    handleEditToggle(); 
  };

  return (
    <div className="profile-card bg-white shadow-md rounded-lg p-6 w-full max-w-xl mx-auto">
      <div className="flex justify-end">
        {currentUser && (
          <button
            className="edit-btn bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleEditToggle}
          >
            {isEditing ? "Cancelar" : "Editar perfil"}
          </button>
        )}
      </div>

      {isEditing ? (
        <EditarPerfil onEdit={handleProfileUpdate} currentUser={currentUser} />
      ) : (
        <div className="profile-info flex flex-col items-center mt-4">
          <img
            className="profile-image w-32 h-32 rounded-full object-cover"
            src={currentUser?.imageLink || "/default-profile.png"}
            alt={`Foto de perfil de ${currentUser?.name}`}
          />
          <h3 className="userName mt-4 text-2xl font-semibold">{currentUser?.name}</h3>
          <p className="heading mt-2 text-gray-600">{currentUser?.headline}</p>
          <a
            className="website mt-2 text-blue-500 hover:underline"
            target="_blank"
            href={currentUser?.website}
            rel="noreferrer"
          >
            {currentUser?.website}
          </a>
        </div>
      )}
    </div>
  );
}
