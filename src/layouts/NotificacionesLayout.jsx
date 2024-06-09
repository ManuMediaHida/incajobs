// src/layouts/NotificacionesLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: NotificacionesLayout.jsx
 * Descripción: Este archivo define el diseño de la página de Notificaciones, incluyendo la barra de navegación vertical (Vbar), la barra de navegación superior (NavbarNotificaciones) y el contenido de notificaciones.
 */

import React from "react";
import Vbar from "../components/Vbar";
import Notificaciones from "../components/Notificaciones";
import NavbarNotificaciones from "../components/navbar/NavbarNotificaciones";

/**
 * Componente de diseño para la página de Notificaciones.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos a ser renderizados dentro del diseño.
 * @returns {JSX.Element} El diseño de la página de Notificaciones.
 */
const NotificacionesLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 font-sans">
      {/* Barra de navegación superior */}
      <NavbarNotificaciones />
      {/* Barra de navegación vertical */}
      <Vbar />
      <div className="flex flex-col items-center mt-20 px-4">
        {/* Componente de notificaciones */}
        <Notificaciones />
        <div className="flex flex-col items-center w-full max-w-screen-md bg-white p-4 rounded-lg shadow-md mt-4">
          {/* Contenido adicional pasado como hijos */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default NotificacionesLayout;
