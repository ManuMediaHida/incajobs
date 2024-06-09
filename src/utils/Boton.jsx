/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Boton.jsx
 * Descripción: Componente de botón reutilizable con estilos y eventos personalizados.
 ***********************************************/

import React from "react";

/**
 * Componente de botón reutilizable.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.title - Texto a mostrar en el botón.
 * @param {function} props.onClick - Función a ejecutar al hacer clic en el botón.
 * @returns {JSX.Element} El botón renderizado.
 */
export default function Boton({ title, onClick }) {
  return (
    <button
      className="w-52 h-8 cursor-pointer bg-gray-200 border-2 border-blue-900 text-blue-800 rounded-full font-sans font-semibold text-sm my-2 hover:bg-gray-300 hover:border-blue-800 hover:text-blue-800"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
