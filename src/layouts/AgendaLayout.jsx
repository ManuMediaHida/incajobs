// src/layouts/AgendaLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: AgendaLayout.jsx
 * Descripción: Este archivo define el diseño de la página de Agenda, incluyendo la barra de navegación vertical (Vbar), la barra de navegación superior (NavbarAgenda) y el contenido de la página de Agenda (AgendaPage).
 */

import React from "react";
import Vbar from "../components/Vbar";
import AgendaPage from "../Pages/AgendaPage";
import NavbarAgenda from "../components/navbar/NavbarAgenda";

/**
 * Componente de diseño para la página de Agenda.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos secundarios a renderizar dentro del diseño.
 * @returns {JSX.Element} El diseño de la página de Agenda.
 */
const AgendaLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Barra de navegación vertical */}
      <Vbar />
      {/* Barra de navegación superior */}
      <NavbarAgenda />
      {/* Contenido principal */}
      <div className="mt-[120px] p-5 bg-gray-100 overflow-auto flex-1">
        {/* Página de Agenda */}
        <AgendaPage />
        {/* Contenido adicional */}
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AgendaLayout;
