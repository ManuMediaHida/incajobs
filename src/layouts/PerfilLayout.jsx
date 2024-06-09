// src/layouts/PerfilLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: PerfilLayout.jsx
 * Descripción: Este archivo define el diseño de la página de perfil, incluyendo la barra de navegación vertical (Vbar), la barra de navegación de perfil (NavbarPerfil) y el contenido principal de la página de perfil.
 */

import React, { useMemo, useState } from "react";
import { obtenerUsuarioActual } from "../server/Firestore";
import Vbar from "../components/Vbar";
import PerfilPage from "../Pages/PerfilPage";
import NavbarPerfil from "../components/navbar/NavbarPerfil";

/**
 * Componente de diseño para la página de perfil.
 *
 * @returns {JSX.Element} El diseño de la página de perfil.
 */
export default function PerfilLayout() {
  const [currentUser, setCurrentUser] = useState({});

  // Usar useMemo para obtener el usuario actual solo una vez cuando el componente se monta.
  useMemo(() => {
    obtenerUsuarioActual(setCurrentUser);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Barra de navegación de perfil */}
      <NavbarPerfil />
      {/* Barra de navegación vertical */}
      <Vbar currentUser={currentUser} />
      {/* Página de perfil */}
      <PerfilPage currentUser={currentUser} />
    </div>
  );
}
