// src/components/Agenda.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Agenda.jsx
 * Descripción: Este componente muestra la lista de contactos del usuario actual, permitiendo seleccionar un contacto para enviarle un mensaje.
 */

import React, { useState, useEffect, useContext } from "react";
import { obtenerConexionesPorIdUsuario } from "../server/Firestore";
import { UserContext } from "../UserContext";

/**
 * Componente para mostrar la agenda de contactos del usuario actual.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.onSelectContact - Función para manejar la selección de un contacto.
 * @returns {JSX.Element} El componente de la agenda de contactos.
 */
const Agenda = ({ onSelectContact }) => {
  const { currentUser } = useContext(UserContext); // Obtiene el usuario actual del contexto
  const [contacts, setContacts] = useState([]); // Estado para almacenar los contactos

  useEffect(() => {
    if (currentUser?.id) {
      console.log("Obteniendo contactos para el usuario actual:", currentUser);
      obtenerConexionesPorIdUsuario(currentUser.id, setContacts);
    } else {
      console.log("El ID del usuario actual no está disponible");
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("Contactos:", contacts);
  }, [contacts]);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Mis Contactos</h2>
      <div className="flex flex-wrap gap-5 justify-center">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg shadow-md p-4 w-64 flex items-center gap-4"
          >
            <img className="w-12 h-12 rounded-full" src={contact.imageLink} alt={contact.name} />
            <div className="flex flex-col flex-grow">
              <p className="font-bold">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.headline}</p>
              <p className="text-sm text-gray-600">{contact.role}</p>
              <p className="text-sm text-gray-600">{contact.nombreEmpresa}</p>
            </div>
            <button
              className="bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700"
              onClick={() => onSelectContact && onSelectContact(contact)}
            >
              Enviar mensaje
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;
