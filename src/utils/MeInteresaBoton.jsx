/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: MeInteresaBoton.jsx
 * Descripción: Componente que muestra un botón de "Me interesa" y una sección de comentarios para una oferta.
 ***********************************************/

import React, { useMemo, useState, useEffect } from "react";
import { darMeGusta, obtenerLikesPorUsuario, publicarComentario, obtenerComentarios } from "../server/Firestore";
import { getCurrentTimeStamp } from "./useMoment";
import { AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

/**
 * Componente que maneja las interacciones de "Me interesa" y comentarios para una oferta.
 *
 * @param {string} userId - ID del usuario actual.
 * @param {string} postId - ID del post.
 * @param {Object} currentUser - Información del usuario actual.
 *
 * @returns {JSX.Element} El componente MeInteresaBoton.
 */
export default function MeInteresaBoton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  /**
   * Maneja el evento de "Me interesa" para el post.
   */
  const handleLike = async () => {
    await darMeGusta(userId, postId, liked);
    obtenerLikesPorUsuario(userId, postId, setLiked, setLikesCount);
  };

  /**
   * Maneja el cambio en el campo de comentarios.
   *
   * @param {Object} event - El evento de cambio del campo de comentarios.
   */
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  /**
   * Añade un comentario al post.
   */
  const addComment = async () => {
    await publicarComentario(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
    setComment("");
    obtenerComentarios(postId, setComments);
  };

  // Efecto para obtener los likes y comentarios del post.
  useEffect(() => {
    obtenerLikesPorUsuario(userId, postId, setLiked, setLikesCount);
    obtenerComentarios(postId, setComments);
  }, [userId, postId]);

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white w-full max-w-lg mx-auto">
      <p className="text-gray-700 mb-2">{likesCount} Gente interesada en esta oferta</p>
      <div className="w-full border-t border-gray-300 mb-4"></div>
      <div className="flex justify-around w-full mb-4">
        <div className="flex items-center cursor-pointer" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={24} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={24} />
          )}
          <p className={`ml-2 font-semibold ${liked ? "text-blue-600" : "text-gray-800"}`}>
            Me interesa
          </p>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment size={24} color={showCommentBox ? "#0a66c2" : "#212121"} />
          <p className={`ml-2 font-semibold ${showCommentBox ? "text-blue-600" : "text-gray-800"}`}>
            Comentarios
          </p>
        </div>
      </div>
      {showCommentBox && (
        <>
          <input
            onChange={handleCommentChange}
            placeholder="Añade un comentario"
            className="w-full p-2 mb-4 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            name="comment"
            value={comment}
          />
          <button
            className="w-full p-2 mb-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            onClick={addComment}
          >
            Añade un comentario
          </button>
          {comments.length > 0 && (
            <div className="w-full">
              {comments.map((comment, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-800 font-semibold">{comment.name}</p>
                  <p className="text-gray-700">{comment.comment}</p>
                  <p className="text-gray-600 text-sm">{comment.timeStamp}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
