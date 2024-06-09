// src/components/ofertas/ActualizarOferta.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ActualizarOferta.jsx
 * Descripción: Este componente permite a los usuarios publicar y actualizar ofertas de trabajo, con funcionalidades adicionales para los usuarios tipo empresa.
 */

import React, { useState, useEffect, useContext } from "react";
import { publicarOferta, getStatus, actualizarOferta as actualizarOfertaFirestore } from "../../server/Firestore";
import { getCurrentTimeStamp } from "../../utils/useMoment";
import Cuadro from "../../utils/Cuadro";
import { subirImagenPost } from "../../server/SubirImagen";
import Oferta from "./Oferta";
import { isUserCompany } from "../../server/Auth";
import { SearchContext } from "../../SearchContext";

/**
 * Componente para actualizar y publicar ofertas de trabajo.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @returns {JSX.Element} El componente de actualización de ofertas.
 */
export default function ActualizarOferta({ currentUser }) {
  const { searchInput } = useContext(SearchContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]); 
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [canPost, setCanPost] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUserType = async () => {
      if (currentUser?.email) {
        try {
          const isCompany = await isUserCompany(currentUser.email);
          setCanPost(isCompany);
        } catch (error) {
          console.error("Error verificando el rol:", error);
          setError("Error verificando el rol");
        }
      }
    };

    checkUserType();
  }, [currentUser]);

  const sendStatus = async () => {
    if (!currentUser) {
      setError("Usuario no identificado");
      return;
    }

    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      userID: currentUser.id,
      postImage: postImage,
    };

    try {
      await publicarOferta(object);
      setModalOpen(false);
      setIsEdit(false);
      setStatus("");
      setPostImage("");
      getStatus(setAllStatus);
    } catch (error) {
      console.error("Error enviando la oferta:", error);
      setError("Error enviando la oferta");
    }
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = async () => {
    try {
      await actualizarOfertaFirestore(currentPost.id, status, postImage);
      setModalOpen(false);
      getStatus(setAllStatus);
    } catch (error) {
      console.error("Error actualizando la oferta:", error);
      setError("Error actualizando la oferta");
    }
  };

  useEffect(() => {
    getStatus(setAllStatus);
  }, []);

  const filteredStatuses = allStatuses.filter((post) =>
    post.status.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center relative z-1 p-4 md:p-8">
      <div className="w-full max-w-[550px] bg-whitesmoke mt-24 border border-gray-400 rounded-lg flex flex-col items-center p-6">
        <img
          src={currentUser?.imageLink}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full mt-[-60px] border border-gray-400 p-1"
        />
        <p className="font-semibold font-sans mt-2">{currentUser?.name}</p>
        <br></br>
        <p className="font-sans mt-[-15px]">{currentUser?.headline}</p>
      </div>

      {canPost ? (
        <div className="w-full max-w-[550px] h-[120px] bg-whitesmoke mt-8 border border-gray-400 rounded-lg flex justify-around items-center p-4">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src={currentUser?.imageLink}
            alt="Profile"
          />
          <button
            className="w-4/5 h-12 text-left text-gray-700 bg-whitesmoke border border-gray-400 rounded-full ml-[-30px] cursor-pointer p-4 font-semibold text-base font-sans hover:bg-gray-200"
            onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
            }}
          >
            Publica una oferta de trabajo
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[550px] h-[120px] bg-whitesmoke mt-8 border border-gray-400 rounded-lg flex justify-center items-center text-gray-700 font-sans">
          Los alumnos no pueden publicar ofertas de trabajo
        </div>
      )}

      <Cuadro
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        actualizarOferta={updateStatus}
        subirImagenPost={subirImagenPost}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div className="w-full max-w-[550px]">
        {filteredStatuses.map((posts) => (
          <div key={posts.id}>
            <Oferta
              posts={posts}
              getEditData={getEditData}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
