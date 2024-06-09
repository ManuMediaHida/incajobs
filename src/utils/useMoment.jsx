/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: useMoment.jsx
 * Descripción: Función para obtener la marca de tiempo actual en un formato especificado.
 ***********************************************/

import moment from "moment/moment";

/**
 * Obtiene la marca de tiempo actual en el formato especificado.
 *
 * @param {string} timeFormat - El formato en el que se desea la marca de tiempo.
 * @returns {string} La marca de tiempo actual formateada.
 */
export const getCurrentTimeStamp = (timeFormat) => {
  return moment().format(timeFormat);
};
