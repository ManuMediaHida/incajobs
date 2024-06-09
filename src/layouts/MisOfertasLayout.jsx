// src/layouts/MisOfertasLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: MisOfertasLayout.jsx
 * Descripción: Este archivo define el diseño de la página de "Mis Ofertas", incluyendo la barra de navegación vertical (Vbar), la barra de navegación superior (NavbarMisOfertas) y el contenido de la página de "Mis Ofertas" (MisOfertasPage).
 */

import React, { useContext } from "react";
import Vbar from "../components/Vbar";
import NavbarMisOfertas from "../components/navbar/NavbarMisOfertas";
import { UserContext } from "../UserContext";
import MisOfertasPage from "../Pages/MisOfertasPage";

/**
 * Componente de diseño para la página de "Mis Ofertas".
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos a ser renderizados dentro del diseño.
 * @returns {JSX.Element} El diseño de la página de "Mis Ofertas".
 */
export default function MisOfertasLayout({ children }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="company-layout flex flex-col min-h-screen bg-gray-100">
      {/* Barra de navegación vertical */}
      <Vbar currentUser={currentUser} />
      {/* Barra de navegación superior */}
      <NavbarMisOfertas currentUser={currentUser} />
      <div className="company-content p-5 flex-grow overflow-auto mt-[120px]">
        {/* Página principal de "Mis Ofertas" */}
        <MisOfertasPage />
        {/* Contenido adicional pasado como hijos */}
        {children}
      </div>
    </div>
  );
}
