// src/components/ofertas/Oferta.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Oferta.jsx
 * Descripción: Este componente muestra los detalles de una oferta de trabajo, permitiendo al usuario ver, editar y borrar ofertas.
 */

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { obtenerTodosLosUsuarios, borrarOferta, obtenerConexiones } from "../../server/Firestore";
import MeInteresaBoton from "../../utils/MeInteresaBoton";

/**
 * Componente para mostrar una oferta de trabajo.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.posts - Los datos de la oferta.
 * @param {Function} props.getEditData - Función para obtener los datos de edición.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @returns {JSX.Element} El componente de la oferta.
 */
export default function Oferta({ posts, getEditData, currentUser }) {
  let navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    obtenerTodosLosUsuarios(setAllUsers);
  }, []);

  useEffect(() => {
    if (currentUser?.id && posts?.userID) {
      obtenerConexiones(currentUser.id, posts.userID, setIsConnected);
    }
  }, [currentUser?.id, posts?.userID]);

  if (!currentUser || !posts) {
    return null; 
  }

  const postDate = posts.timeStamp instanceof Date ? posts.timeStamp : new Date(posts.timeStamp);

  const user = allUsers.find((item) => item.id === posts.userID) || {};

  return (
    <div className="posts-card w-full max-w-[550px] bg-whitesmoke mt-8 border border-gray-400 rounded-lg flex flex-col p-4 overflow-hidden shadow-md">
      <div className="post-image-wrapper flex items-center gap-4 p-4 relative">
        {currentUser.id === posts.userID && (
          <div className="action-container absolute top-2 right-2 flex space-x-2">
            <BsPencil
              size={20}
              className="action-icon cursor-pointer text-gray-700 hover:text-black"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon cursor-pointer text-gray-700 hover:text-black"
              onClick={() => borrarOferta(posts.id)}
            />
          </div>
        )}
        <img
          alt="profile-image"
          className="profile-image w-16 h-16 rounded-full object-cover"
          src={user.imageLink || ""}
        />
        <div>
          <p
            className="name font-semibold text-lg cursor-pointer"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {user.name || "Desconocido"}
          </p>
          <p className="headline text-sm text-gray-600">
            {user.headline || ""}
          </p>
          <p className="timestamp text-xs text-gray-600">
            {postDate.toLocaleString()}
          </p>
        </div>
      </div>
      {posts.postImage && (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image cursor-pointer w-full"
          alt="post-image"
        />
      )}
      <p
        className="status text-left mt-4 text-lg font-normal text-black"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <MeInteresaBoton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          src={posts.postImage}
          className="post-image modal w-full"
          alt="post-image"
        />
      </Modal>
    </div>
  );
}
