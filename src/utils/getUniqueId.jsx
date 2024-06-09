/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: getUniqueID.jsx
 * Descripción: Utilidad para generar un ID único usando la librería react-uuid.
 ***********************************************/

import uuid from "react-uuid";

/**
 * Genera un ID único utilizando la librería react-uuid.
 *
 * @returns {string} Un ID único.
 */
export const getUniqueID = () => {
  let id = uuid();

  return id;
};
