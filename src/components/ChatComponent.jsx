// src/components/ChatComponent.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ChatComponent.jsx
 * Descripción: Este componente permite a los usuarios enviar y recibir mensajes en un chat con otro usuario.
 */

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { obtenerMensajes, enviarMensaje } from "../server/Firestore";

/**
 * Componente de chat para enviar y recibir mensajes.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.chatPartner - Los datos del usuario con quien se está chateando.
 * @returns {JSX.Element} El componente de chat.
 */
const ChatComponent = ({ chatPartner }) => {
  const { currentUser } = useContext(UserContext); // Obtiene el usuario actual del contexto
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes del chat
  const [newMessage, setNewMessage] = useState(""); // Estado para el nuevo mensaje

  // Obtiene los mensajes del chat al cargar el componente o cambiar el chatPartner
  useEffect(() => {
    if (currentUser?.id && chatPartner?.id) {
      const chatId = currentUser.id < chatPartner.id 
        ? `${currentUser.id}_${chatPartner.id}` 
        : `${chatPartner.id}_${currentUser.id}`;
      return obtenerMensajes(chatId, setMessages);
    }
  }, [currentUser, chatPartner]);

  /**
   * Maneja el envío de un nuevo mensaje.
   */
  const handleSendMessage = async () => {
    if (newMessage.trim() && currentUser?.id && chatPartner?.id) {
      const chatId = currentUser.id < chatPartner.id 
        ? `${currentUser.id}_${chatPartner.id}` 
        : `${chatPartner.id}_${currentUser.id}`;
      await enviarMensaje(chatId, newMessage, currentUser.id, chatPartner.id);
      setNewMessage("");
    } else {
      console.error("Current user or chat partner is not defined");
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-1/2 mx-auto border border-gray-300 rounded-md bg-gray-100">
      <div className="p-4 bg-blue-600 text-white rounded-t-md text-center">
        <h2>Chat con {chatPartner.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-md ${msg.senderId === currentUser.id ? "bg-green-200 self-end" : "bg-red-200 self-start"}`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
