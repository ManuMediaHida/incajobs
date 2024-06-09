// src/components/contactos/Contacto.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Contacto.jsx
 * Descripción: Este componente muestra la tarjeta de un contacto, permitiendo ver el perfil del usuario, añadirlo a contactos y ver su currículum si es un alumno.
 */

import React, { useEffect, useRef } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import CurriculumPdf from "../curriculum/CurriculumPdf"; // Asegúrate de importar correctamente
import { useNavigate } from "react-router-dom";

/**
 * Componente para mostrar la información de un contacto.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.user - Los datos del usuario.
 * @param {Function} props.getCurrentUser - Función para obtener el usuario actual.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @param {boolean} props.isConnected - Indica si el usuario ya está conectado.
 * @returns {JSX.Element|null} El componente de contacto.
 */
export default function Contacto({ user, getCurrentUser, currentUser, isConnected }) {
  const componentRef = useRef(); 
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleProfileClick = () => {
    navigate(`/user-profile/${user.id}`);
  };

  if (isConnected) {
    return null;
  }

  return (
    <div
      className="relative p-5 bg-white rounded-lg shadow-sm cursor-pointer transition-transform transform hover:-translate-y-1 mb-5 text-center"
      onClick={handleProfileClick}
    >
      <img
        src={user.imageLink}
        alt="User Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <p className="text-lg font-bold text-gray-800 mb-1">{user.name}</p>
      <p className="text-sm text-gray-500 mb-1">{user.headline}</p>
      <div className="flex flex-col items-center gap-2 mt-2">
        <button
          className="bg-green-600 text-white py-2 px-3 rounded w-4/5 max-w-xs hover:bg-green-700"
          onClick={(e) => {
            e.stopPropagation();
            getCurrentUser(user.id);
          }}
        >
          <AiOutlineUsergroupAdd size={20} />
          Añadir a Contactos
        </button>
        {user.role === "alumno" && (
          <button
            className="bg-blue-600 text-white py-2 px-3 rounded w-4/5 max-w-xs hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              handlePrint();
            }}
          >
            Ver Currículum
          </button>
        )}
      </div>
      <div style={{ display: "none" }}>
        <CurriculumPdf ref={componentRef} user={user} />
      </div>
    </div>
  );
}
