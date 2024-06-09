// src/components/Notificaciones.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Notificaciones.jsx
 * Descripción: Este componente muestra las notificaciones del usuario y permite marcarlas como leídas o responder a ellas.
 */

import React, { useState, useEffect, useContext } from "react";
import { obtenerNotificaciones, marcarNotificacionComoLeida } from "../server/Firestore";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

/**
 * Componente para mostrar y manejar las notificaciones del usuario.
 *
 * @returns {JSX.Element} El componente de notificaciones.
 */
const Notificaciones = () => {
  const { currentUser } = useContext(UserContext); 
  const [notifications, setNotifications] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      obtenerNotificaciones(currentUser.id, setNotifications);
    }
  }, [currentUser]);

  /**
   * Maneja el marcado de una notificación como leída.
   *
   * @param {string} notificationId - El ID de la notificación a marcar como leída.
   */
  const handleMarkAsRead = async (notificationId) => {
    await marcarNotificacionComoLeida(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  /**
   * Maneja la respuesta a una notificación, navegando al chat con el remitente.
   *
   * @param {string} senderId - El ID del remitente de la notificación.
   */
  const handleReply = (senderId) => {
    navigate(`/chat/${senderId}`);
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-5">Notificaciones</h2>
      <ul className="w-full max-w-3xl">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`p-4 mb-4 rounded shadow ${
              notification.read ? "bg-gray-200" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{notification.senderName}</p>
                <p>{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp?.toDate()).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!notification.read && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Marcar como leído
                  </button>
                )}
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleReply(notification.senderId)}
                >
                  Responder
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
