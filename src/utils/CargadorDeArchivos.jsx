/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: CargadorDeArchivos.jsx
 * Descripción: Componente para subir y mostrar una nueva imagen de perfil.
 ***********************************************/

import React from "react";
import { AiOutlineClose } from "react-icons/ai";

/**
 * Componente de CargadorDeArchivos para subir y previsualizar una nueva imagen de perfil.
 *
 * @param {boolean} modalOpen - Estado que controla la visibilidad del modal.
 * @param {function} setModalOpen - Función para actualizar el estado del modal.
 * @param {function} getImage - Función para manejar la selección de una nueva imagen.
 * @param {function} uploadImage - Función para manejar la subida de la imagen.
 * @param {File} currentImage - Imagen actualmente seleccionada para la previsualización.
 * @param {number} progress - Progreso de la subida de la imagen.
 * @returns {JSX.Element} El modal del cargador de archivos renderizado.
 */
export default function CargadorDeArchivos({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subir nueva foto de perfil</h2>
          <AiOutlineClose
            className="cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <input type="file" onChange={getImage} />
        {currentImage && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(currentImage)}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        <div className="mt-4">
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={uploadImage}
          >
            Subir Imagen
          </button>
          {progress > 0 && (
            <div className="mt-2 w-full bg-gray-200 rounded-lg">
              <div
                className="bg-blue-500 h-2 rounded-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
