// src/components/perfil/VentanaPerfil.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: VentanaPerfil.jsx
 * Descripción: Este componente muestra una ventana de perfil flotante con opciones para ver el perfil del usuario actual y cerrar sesión.
 */

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cerrarSesion, obtenerUsuarioActual } from "../../server/Auth"; // Importa las funciones desde el archivo correcto
import Boton from "../../utils/Boton";
import { AiOutlineClose } from "react-icons/ai";

/**
 * Componente de ventana de perfil flotante.
 *
 * @returns {JSX.Element} La ventana de perfil flotante.
 */
export default function VentanaPerfil() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    obtenerUsuarioActual(setCurrentUser);
  }, []);

  /**
   * Maneja el cierre de la ventana de perfil.
   */
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="fixed bottom-2 left-2 transform translate-x-0 border border-gray-400 bg-white rounded-md flex flex-col p-5 shadow-lg">
      <div className="flex justify-end items-center w-full mb-3">
        <AiOutlineClose className="text-xl cursor-pointer" onClick={handleClose} />
      </div>
      <p className="text-lg font-semibold text-gray-900 mb-1">{currentUser?.name}</p>
      <p className="text-sm font-normal text-gray-700 mb-4">{currentUser?.headline}</p>
      <div className="flex flex-col gap-2">
        <Boton
          title="Ver perfil"
          onClick={() =>
            navigate("/profile", {
              state: {
                id: currentUser?.id,
              },
            })
          }
        />
        <Boton title="Cerrar Sesión" onClick={cerrarSesion} />
      </div>
    </div>
  );
}
