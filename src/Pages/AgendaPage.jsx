// src/Pages/AgendaPage.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: AgendaPage.jsx
 * Descripción: Este archivo define la página de la agenda, que permite a los usuarios ver sus contactos y chatear con ellos.
 */

import React, { useContext, useState } from "react";
import Agenda from "../components/Agenda";
import { UserContext } from "../UserContext";
import ChatComponent from "../components/ChatComponent";

/**
 * Componente de página para la agenda.
 *
 * @returns {JSX.Element} La estructura de la página de agenda.
 */
const AgendaPage = () => {
  const { currentUser, loading } = useContext(UserContext);
  const [selectedContact, setSelectedContact] = useState(null);

  /**
   * Maneja la selección de un contacto en la agenda.
   *
   * @param {Object} contact - El contacto seleccionado.
   */
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!currentUser) {
    return <div className="text-center">No se encontró ningún usuario.</div>;
  }

  return (
    <div className="flex justify-center items-center h-full w-full p-4">
      {selectedContact ? (
        <ChatComponent chatPartner={selectedContact} />
      ) : (
        <Agenda currentUser={currentUser} onSelectContact={handleSelectContact} />
      )}
    </div>
  );
};

export default AgendaPage;
