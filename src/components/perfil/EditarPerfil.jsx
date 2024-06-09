// src/components/perfil/EditarPerfil.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: EditarPerfil.jsx
 * Descripción: Este componente permite a los usuarios editar su perfil, incluyendo su nombre, descripción, página web y foto de perfil.
 */

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { editarPerfil } from "../../server/Firestore"; // Cambiado a editarPerfil
import CargadorDeArchivos from "../../utils/CargadorDeArchivos";
import { subirImagenPerfil } from "../../server/SubirImagen";

/**
 * Componente para editar el perfil del usuario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.onEdit - Función para manejar la edición.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @returns {JSX.Element} El componente de edición de perfil.
 */
export default function EditarPerfil({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser); // Estado para los inputs de edición
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [currentImage, setCurrentImage] = useState(null); // Estado para la imagen actual
  const [progress, setProgress] = useState(0); // Estado para el progreso de la carga de imagen

  /**
   * Maneja los cambios en los campos de entrada.
   *
   * @param {Object} event - El evento de cambio.
   */
  const getInput = (event) => {
    const { name, value } = event.target;
    setEditInputs({ ...editInputs, [name]: value });
  };

  /**
   * Actualiza los datos del perfil del usuario.
   */
  const updateProfileData = async () => {
    await editarPerfil(currentUser?.id, editInputs); 
    await onEdit();
  };

  /**
   * Obtiene la imagen seleccionada.
   *
   * @param {Object} event - El evento de cambio de archivo.
   */
  const getImage = (event) => {
    if (event.target.files[0]) {
      setCurrentImage(event.target.files[0]);
    }
  };

  /**
   * Maneja la carga de la imagen de perfil.
   */
  const handleUploadImage = () => {
    if (currentImage) {
      subirImagenPerfil(currentImage, currentUser?.id, setModalOpen, setProgress, setCurrentImage);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl mx-auto">
      <div className="flex justify-end">
        <AiOutlineClose
          className="text-gray-500 hover:text-red-500 cursor-pointer"
          size={25}
          onClick={onEdit}
        />
      </div>
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full object-cover mt-4"
          src={currentUser?.imageLink || "/default-profile.png"}
          alt={`Foto de perfil de ${currentUser?.name}`}
        />
        <div className="w-full mt-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            onChange={getInput}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Nombre"
            name="name"
            value={editInputs.name}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-gray-700">Descripción</label>
          <input
            onChange={getInput}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Descripción"
            name="headline"
            value={editInputs.headline}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block text-gray-700">Página Web</label>
          <input
            onChange={getInput}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="URL de la página web"
            name="website"
            value={editInputs.website}
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={updateProfileData}
        >
          Guardar
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => setModalOpen(true)}
        >
          Cambiar foto de perfil
        </button>
      </div>
      <CargadorDeArchivos
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        getImage={getImage}
        uploadImage={handleUploadImage}
        currentImage={currentImage}
        progress={progress}
      />
    </div>
  );
}
