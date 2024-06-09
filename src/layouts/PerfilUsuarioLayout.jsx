// src/layouts/PerfilUsuarioLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: PerfilUsuarioLayout.jsx
 * Descripción: Este archivo define el diseño de la página de perfil de usuario, incluyendo la barra de navegación vertical (Vbar) y el contenido principal de la página de perfil de usuario.
 */

import React from "react";
import Vbar from "../components/Vbar";
import PerfilUsuarioPage from "../Pages/PerfilUsuarioPage";

/**
 * Componente de diseño para la página de perfil de usuario.
 *
 * @param {Object} props - Props del componente.
 * @param {React.ReactNode} props.children - Componentes secundarios que se renderizarán dentro del diseño.
 * @returns {JSX.Element} El diseño de la página de perfil de usuario.
 */
const PerfilUsuarioLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Barra de navegación vertical */}
      <Vbar />
      {/* Página de perfil de usuario */}
      <PerfilUsuarioPage />
      {/* Contenido adicional proporcionado como hijos */}
      <div className="user-profile-content">
        {children}
      </div>
    </div>
  );
};

export default PerfilUsuarioLayout;
