// src/components/navbar/NavbarMisOfertas.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: NavbarMisOfertas.jsx
 * Descripción: Este componente muestra la barra de navegación para la sección de "Mis Ofertas", con iconos de redes sociales y un título centrado.
 */

import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * Componente para la barra de navegación de la sección de "Mis Ofertas".
 *
 * @returns {JSX.Element} El componente de la barra de navegación.
 */
export default function NavbarMisOfertas() {
  const navigate = useNavigate();

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
      <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 hidden sm:block">Mis Ofertas</div>
      <div className="flex items-center gap-2 sm:gap-5 ml-auto">
        <FaInstagram
          className="hidden sm:block text-white cursor-pointer text-2xl hover:text-yellow-400"
          onClick={() => goToRoute("/instagram")}
        />
        <FaTwitter
          className="hidden sm:block text-white cursor-pointer text-2xl hover:text-yellow-400"
          onClick={() => goToRoute("/twitter")}
        />
        <FaFacebook
          className="hidden sm:block text-white cursor-pointer text-2xl hover:text-yellow-400"
          onClick={() => goToRoute("/facebook")}
        />
      </div>
    </div>
  );
}
