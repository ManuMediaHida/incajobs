/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: SearchContext.jsx
 * Descripción: Define el contexto de búsqueda y su proveedor.
 ***********************************************/

import React, { createContext, useState } from "react";

// Creación del contexto de búsqueda
export const SearchContext = createContext();

// Proveedor del contexto de búsqueda
export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");

  // Proveer el valor del contexto a los componentes hijos
  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};
