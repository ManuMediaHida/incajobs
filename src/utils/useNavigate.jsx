/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: navigate.jsx
 * Descripción: Proporciona una función de navegación reutilizable utilizando react-router-dom.
 ***********************************************/

import React from "react";
import { useNavigate as useReactRouterNavigate } from "react-router-dom";

let instance = useReactRouterNavigate();

/**
 * Función para navegar a una ruta específica.
 *
 * @param {string} param - La ruta a la que se desea navegar.
 */
export const navigate = (param) => {
  instance(param);
};
