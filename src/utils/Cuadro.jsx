/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Cuadro.jsx
 * Descripción: Componente para crear y actualizar publicaciones con posibilidad de subir imágenes.
 ***********************************************/

import React, { useState } from "react";
import { Button, Modal, Progress } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import { subirImagenPost } from "../server/SubirImagen"; // Importa la función correctamente

/**
 * Componente Cuadro para crear y actualizar publicaciones.
 *
 * @param {boolean} modalOpen - Estado que controla la visibilidad del modal.
 * @param {function} setModalOpen - Función para actualizar el estado del modal.
 * @param {function} sendStatus - Función para enviar una nueva publicación.
 * @param {function} setStatus - Función para actualizar el estado de la publicación.
 * @param {string} status - Contenido de la publicación.
 * @param {boolean} isEdit - Indica si se está editando una publicación existente.
 * @param {function} actualizarOferta - Función para actualizar una publicación existente.
 * @param {function} setPostImage - Función para establecer la imagen de la publicación.
 * @param {string} postImage - URL de la imagen de la publicación.
 * @param {object} currentPost - Datos de la publicación actual.
 * @param {function} setCurrentPost - Función para establecer la publicación actual.
 * @returns {JSX.Element} El modal para crear o actualizar una publicación.
 */
const Cuadro = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  actualizarOferta,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);

  // Maneja el cierre del modal.
  const handleModalClose = () => {
    setStatus("");
    setModalOpen(false);
    setPostImage("");
    setCurrentPost({});
    setProgress(0); // Restablecer el progreso al cerrar el modal
  };

  return (
    <Modal
      title={isEdit ? "Actualizar Publicación" : "Crear una Publicación"}
      centered
      open={modalOpen}
      onOk={handleModalClose}
      onCancel={handleModalClose}
      footer={[
        <Button
          onClick={isEdit ? actualizarOferta : sendStatus}
          key="submit"
          type="primary"
          disabled={!status.length}
        >
          {isEdit ? "Actualizar" : "Publicar"}
        </Button>,
      ]}
    >
      <div className="flex flex-col items-center">
        <ReactQuill
          className="w-full bg-white text-black text-lg font-sans resize-none"
          theme="snow"
          value={status}
          placeholder="Publica tu oferta de trabajo.."
          onChange={setStatus}
        />
        {progress !== 0 && progress !== 100 && (
          <div className="p-5">
            <Progress type="circle" percent={progress} />
          </div>
        )}
        {(postImage?.length > 0 || currentPost?.postImage?.length) && (
          <img
            className="w-full mt-5"
            src={postImage || currentPost?.postImage}
            alt="postImage"
          />
        )}
      </div>
      <label htmlFor="pic-upload">
        <AiOutlinePicture
          size={35}
          className="text-blue-600 cursor-pointer absolute bottom-5"
        />
      </label>
      <input
        id="pic-upload"
        type="file"
        hidden
        onChange={(event) =>
          subirImagenPost(event.target.files[0], setPostImage, setProgress)
        }
      />
    </Modal>
  );
};

export default Cuadro;
