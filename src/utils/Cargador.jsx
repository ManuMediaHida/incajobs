/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Cargador.jsx
 * Descripción: Componente que muestra un indicador de carga con un mensaje.
 ***********************************************/

import React from "react";
import { Space, Spin } from "antd";

/**
 * Componente de cargador que muestra un indicador de carga con un mensaje.
 *
 * @returns {JSX.Element} El cargador renderizado.
 */
export default function Cargador() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <p className="font-medium text-black text-opacity-90 text-lg">Cargando..</p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
