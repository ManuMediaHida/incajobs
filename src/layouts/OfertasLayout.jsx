// src/layouts/OfertasLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: OfertasLayout.jsx
 * Descripción: Este archivo define el diseño de la página de Ofertas, incluyendo la barra de navegación vertical (Vbar), la barra de navegación principal (NavbarPrincipal) y el contenido principal de la página de ofertas.
 */

import React, { useMemo, useState } from "react";
import OfertasPage from "../Pages/OfertasPage";
import { obtenerUsuarioActual } from "../server/Firestore";
import Vbar from "../components/Vbar";
import NavbarPrincipal from "../components/navbar/NavbarPrincipal";

/**
 * Componente de diseño para la página de Ofertas.
 *
 * @returns {JSX.Element} El diseño de la página de Ofertas.
 */
export default function OfertasLayout() {
  const [currentUser, setCurrentUser] = useState({});

  // Usar useMemo para obtener el usuario actual solo una vez cuando el componente se monta.
  useMemo(() => {
    obtenerUsuarioActual(setCurrentUser);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Barra de navegación vertical */}
      <Vbar currentUser={currentUser} />
      {/* Barra de navegación principal */}
      <NavbarPrincipal />
      {/* Contenido principal */}
      <div className="mt-[120px] p-5 bg-gray-100 overflow-auto flex-1">
        <OfertasPage currentUser={currentUser} />
      </div>
    </div>
  );
}
