// src/components/contacts/BuscarContacto.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: BuscarContacto.jsx
 * Descripción: Este componente proporciona una barra de búsqueda para encontrar contactos y un botón para cerrar la búsqueda.
 */

import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

/**
 * Componente para buscar un contacto.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.setIsSearch - Función para establecer el estado de búsqueda.
 * @param {Function} props.setSearchInput - Función para establecer el valor de la entrada de búsqueda.
 * @returns {JSX.Element} El componente de búsqueda de contacto.
 */
export default function BuscarContacto({ setIsSearch, setSearchInput }) {
  return (
    <div className="flex items-center w-2/5 ml-4">
      <input
        placeholder="Buscar contacto"
        onChange={(event) => setSearchInput(event.target.value)}
        className="w-full h-8 bg-whitesmoke border border-gray-400 rounded-lg text-gray-800 pl-2 text-sm outline-none focus:border-gray-500"
      />
      <AiOutlineCloseCircle
        className="ml-[-30px] text-gray-500 cursor-pointer"
        size={20}
        onClick={() => {
          setIsSearch(false);
          setSearchInput("");
        }}
      />
    </div>
  );
}
