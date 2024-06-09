// src/components/navbar/NavbarPrincipal.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: NavbarPrincipal.jsx
 * Descripción: Este componente muestra la barra de navegación principal, con un campo de búsqueda y iconos de redes sociales.
 */

import React, { useContext } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../SearchContext"; // Importa el contexto

/**
 * Componente para la barra de navegación principal.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @returns {JSX.Element} El componente de la barra de navegación principal.
 */
export default function NavbarPrincipal({ currentUser }) {
  const navigate = useNavigate();
  const { setSearchInput } = useContext(SearchContext); // Utiliza el contexto de búsqueda

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
      <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 hidden sm:block">IncaJobs</div>
      <div className="flex items-center gap-5 ml-auto">
        <div className="relative">
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar publicaciones..."
            className="w-48 p-2 text-base rounded-md border border-gray-300 text-gray-800"
          />
        </div>
        <FaInstagram
          className="text-white cursor-pointer text-2xl hover:text-yellow-400 hidden md:block"
          onClick={() => goToRoute("/instagram")}
        />
        <FaTwitter
          className="text-white cursor-pointer text-2xl hover:text-yellow-400 hidden md:block"
          onClick={() => goToRoute("/twitter")}
        />
        <FaFacebook
          className="text-white cursor-pointer text-2xl hover:text-yellow-400 hidden md:block"
          onClick={() => goToRoute("/facebook")}
        />
      </div>
    </div>
  );
}
