/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: NotificacionesPage.jsx
 * Descripción: Página que muestra las notificaciones del usuario.
 ***********************************************/

import React, { useEffect, useState, useContext } from "react";
import { obtenerNotificaciones, marcarNotificacionComoLeida } from "../server/Firestore";
import { UserContext } from "../UserContext";

/**
 * Componente para la página de notificaciones.
 *
 * @returns {JSX.Element} La estructura de la página de notificaciones.
 */
const NotificationsPage = () => {
  const { currentUser } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  // Efecto para obtener las notificaciones del usuario actual.
  useEffect(() => {
    if (currentUser?.id) {
      obtenerNotificaciones(currentUser.id, setNotifications);
    }
  }, [currentUser]);

  // Maneja la acción de marcar una notificación como leída.
  const handleMarkAsRead = async (notificationId) => {
    await marcarNotificacionComoLeida(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Notificaciones</h2>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`bg-gray-50 p-5 mb-4 border-l-4 ${
              notification.read ? "border-green-500" : "border-orange-500"
            } shadow-md flex justify-between items-center`}
          >
            <div className="notification-message text-lg text-gray-700">
              {notification.message}
            </div>
            <div className="notification-time text-sm text-gray-500">
              {new Date(notification.timestamp?.toDate()).toLocaleString()}
            </div>
            <div className="notification-actions">
              {!notification.read && (
                <button
                  className="mark-read bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-600"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Marcar como Leída
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
