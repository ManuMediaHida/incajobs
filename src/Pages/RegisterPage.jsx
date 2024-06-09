/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: RegisterPage.jsx
 * Descripción: Página de registro que renderiza el componente de registro en un diseño centrado.
 ***********************************************/

import React from "react";
import RegisterComponent from "../components/RegisterComponent";

/**
 * Componente para la página de registro.
 *
 * @returns {JSX.Element} La estructura de la página de registro.
 */
export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <RegisterComponent />
    </div>
  );
}
