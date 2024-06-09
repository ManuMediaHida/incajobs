// src/layouts/CurriculumLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: CurriculumLayout.jsx
 * Descripción: Este archivo define el diseño de la página de currículum, incluyendo la barra de navegación vertical (Vbar), la barra de navegación superior (NavbarCurriculum) y el contenido de la página de currículum (CurriculumPage).
 */

import React from "react";
import Vbar from "../components/Vbar";
import NavbarCurriculum from "../components/navbar/NavbarCurriculum";
import CurriculumPage from "../Pages/CurriculumPage";

/**
 * Componente de diseño para la página de Currículum.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos a ser renderizados dentro del diseño.
 * @param {Object} props.currentUser - El usuario actual, utilizado para personalizar la barra de navegación.
 * @returns {JSX.Element} El diseño de la página de Currículum.
 */
export default function CurriculumLayout({ children, currentUser }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      {/* Barra de navegación vertical */}
      <Vbar currentUser={currentUser} />
      {/* Barra de navegación superior */}
      <NavbarCurriculum />
      <div className="curriculum-content">
        {/* Página principal del Currículum */}
        <CurriculumPage />
        {/* Contenido adicional pasado como hijos */}
        {children}
      </div>
    </div>
  );
}
