// src/components/navbar/NavbarCurriculum.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: NavbarCurriculum.jsx
 * Descripción: Este componente muestra la barra de navegación para la sección de currículum, con iconos de redes sociales y un título centrado.
 */

import React, { useContext } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../SearchContext"; // Importa el contexto

/**
 * Componente para la barra de navegación de la sección de currículum.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @returns {JSX.Element} El componente de la barra de navegación.
 */
export default function NavbarCurriculum({ currentUser }) {
  const navigate = useNavigate();
  const { setSearchInput } = useContext(SearchContext); 

  /**
   * Función para navegar a una ruta específica.
   *
   * @param {string} route - La ruta a la que se quiere navegar.
   */
  const goToRoute = (route) => {
    navigate(route);
  };

  return (
    <div className="flex items-center justify-between p-5 bg-green-600 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">Currículum</div>
      <div className="flex items-center gap-5 ml-auto">
        <FaInstagram
          className="text-white cursor-pointer text-2xl hover:text-yellow-400 hidden sm:block"
          onClick={() => goToRoute("/instagram")}
        />
        <FaTwitter
          className="text-white cursor-pointer text-2xl hover:text-yellow-400 hidden sm:block"
          onClick={() => goToRoute("/twitter")}
        />
        <FaFacebook
          className="text-white cursor-pointer text-2xl hover:text-yellow-400 hidden sm:block"
          onClick={() => goToRoute("/facebook")}
        />
      </div>
    </div>
  );
}
