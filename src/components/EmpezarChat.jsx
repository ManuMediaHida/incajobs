// src/components/EmpezarChat.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: EmpezarChat.jsx
 * Descripción: Este componente permite al usuario actual seleccionar otro usuario para iniciar un chat.
 */

import React, { useState, useEffect } from "react";
import { getUsers, createChat } from "../server/FirestoreAPI";

/**
 * Componente para iniciar un nuevo chat.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.currentUser - Los datos del usuario actual.
 * @param {Function} props.onChatCreated - Función que se llama cuando se crea un nuevo chat.
 * @returns {JSX.Element} El componente para iniciar un nuevo chat.
 */
const EmpezarChat = ({ currentUser, onChatCreated }) => {
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
  const [selectedUser, setSelectedUser] = useState(""); // Estado para el usuario seleccionado

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  /**
   * Maneja la creación de un nuevo chat.
   */
  const handleStartChat = async () => {
    if (selectedUser) {
      const chatID = await createChat(currentUser.userID, selectedUser); 
      onChatCreated(chatID); 
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        value={selectedUser}
        className="p-2 mb-4 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        <option value="">Selecciona un usuario para chatear</option>
        {users.map(user => (
          <option key={user.userID} value={user.userID}>{user.name}</option>
        ))}
      </select>
      <button
        onClick={handleStartChat}
        className="p-2 bg-green-600 text-white rounded w-full hover:bg-green-700"
      >
        Iniciar Chat
      </button>
    </div>
  );
};

export default EmpezarChat;
