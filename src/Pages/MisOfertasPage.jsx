/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: MisOfertasPage.jsx
 * Descripción: Página que muestra las ofertas publicadas por la empresa.
 ***********************************************/

import React from "react";
import MisOfertas from "../components/MisOfertas";

/**
 * Componente para la página de ofertas de la empresa.
 *
 * @returns {JSX.Element} La estructura de la página de ofertas.
 */
export default function MisOfertasPage() {
  return (
    <div className="p-20">
     
      <div className="grid grid-cols-auto-fill gap-20">
        <MisOfertas className="border border-gray-300 p-20 rounded-lg bg-gray-100 shadow-md" hoverClassName="shadow-lg" />
      </div>
    </div>
  );
}
