// src/Pages/ChatPage.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ChatPage.jsx
 * Descripción: Este archivo define la página de chat, que permite a los usuarios seleccionar un contacto de su agenda y chatear con él.
 */

import React, { useState, useContext } from 'react';
import ChatComponent from '../components/ChatComponent';
import { UserContext } from '../UserContext';
import Agenda from '../components/Agenda';

/**
 * Componente de página para el chat.
 *
 * @returns {JSX.Element} La estructura de la página de chat.
 */
const ChatPage = () => {
  const { currentUser } = useContext(UserContext);
  const [chatPartner, setChatPartner] = useState(null);

  /**
   * Maneja la selección de un contacto en la agenda.
   *
   * @param {Object} contact - El contacto seleccionado.
   */
  const handleSelectContact = (contact) => {
    console.log('Selected Contact:', contact);
    setChatPartner(contact);
  };

  console.log('Current User in ChatPage:', currentUser);

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 font-sans">
      <div className="w-1/4 border-r border-gray-300">
        <Agenda
          currentUser={currentUser}
          onSelectContact={handleSelectContact}
        />
      </div>
      <div className="w-3/4">
        {chatPartner ? (
          <ChatComponent chatPartner={chatPartner} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h3 className="text-xl">Selecciona un contacto para chatear</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
