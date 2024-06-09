// src/components/Vbar.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Vbar.jsx
 * Descripción: Este componente muestra la barra lateral de navegación.
 */

import React, { useState, useContext, useEffect } from "react";
import user from "../assets/user.png";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineBell,
  AiOutlineFileText,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsBriefcase, BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import VentanaPerfil from "../components/perfil/VentanaPerfil";
import { UserContext } from "../UserContext";
import { obtenerNotificaciones } from "../server/Firestore"; // Importar obtenerNotificaciones

/**
 * Componente de barra de navegación vertical.
 *
 * @returns {JSX.Element} La barra de navegación vertical.
 */
export default function Vbar() {
  const [popupVisible, setPopupVisible] = useState(false); // Estado para controlar la visibilidad del popup
  const [notifications, setNotifications] = useState([]); // Estado para almacenar las notificaciones
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú en dispositivos móviles
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // Obtener notificaciones cuando el usuario actual cambia
  useEffect(() => {
    if (currentUser?.id) {
      obtenerNotificaciones(currentUser.id, setNotifications);
    }
  }, [currentUser]);

  // Contar el número de notificaciones no leídas
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  // Función para navegar a una ruta específica
  const goToRoute = (route) => {
    navigate(route);
  };

  // Función para mostrar u ocultar el popup
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  // Función para mostrar u ocultar el menú en dispositivos móviles
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`flex flex-col items-center w-16 md:w-64 ${isMenuOpen ? 'h-screen' : 'h-16 md:h-screen'} bg-green-600 shadow-md fixed z-[100]`}>
      <AiOutlineMenu
        className="text-white text-2xl cursor-pointer mt-4 md:hidden"
        onClick={toggleMenu}
      />
      <div className={`flex flex-col items-center ${isMenuOpen ? 'space-y-5 mt-8' : 'hidden md:flex md:space-y-8 md:mt-8'}`}>
        <img
          className="w-12 h-12 rounded-full object-cover mt-4 cursor-pointer md:w-20"
          src="./incajobs_logo.png"
          alt="IncaJobsLogo"
        />
        <div className="flex flex-col items-center">
          <AiOutlineHome
            className="text-white text-2xl cursor-pointer hover:text-yellow-400"
            onClick={() => goToRoute("/home")}
          />
          <span className="text-white text-sm hidden md:block">Inicio</span>
        </div>
        <div className="flex flex-col items-center">
          <AiOutlineUserSwitch
            className="text-white text-2xl cursor-pointer hover:text-yellow-400"
            onClick={() => goToRoute("/connections")}
          />
          <span className="text-white text-sm hidden md:block">Contactos</span>
        </div>
        {currentUser && currentUser.role === "empresa" && (
          <div className="flex flex-col items-center">
            <BsBriefcase
              className="text-white text-2xl cursor-pointer hover:text-yellow-400"
              onClick={() => goToRoute("/company-posts")}
            />
            <span className="text-white text-sm hidden md:block">Publicaciones</span>
          </div>
        )}
        {currentUser && currentUser.role === "alumno" && (
          <div className="flex flex-col items-center">
            <AiOutlineFileText
              className="text-white text-2xl cursor-pointer hover:text-yellow-400"
              onClick={() => goToRoute("/curriculum")}
            />
            <span className="text-white text-sm hidden md:block">Currículum</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <BsPeople
            className="text-white text-2xl cursor-pointer hover:text-yellow-400"
            onClick={() => goToRoute("/my-contacts")}
          />
          <span className="text-white text-sm hidden md:block">Agenda</span>
        </div>
        <div
          className="relative cursor-pointer flex flex-col items-center"
          onClick={() => goToRoute("/notifications")}
        >
          <AiOutlineBell className="text-white text-2xl hover:text-yellow-400" />
          {unreadCount > 0 && (
            <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white rounded-full text-xs font-bold px-1">
              {unreadCount}
            </span>
          )}
          <span className="text-white text-sm hidden md:block">Notificaciones</span>
        </div>
        <img
          className="w-12 h-12 rounded-full object-cover mt-4 cursor-pointer md:hidden"
          src={currentUser?.imageLink || user}
          alt="user"
          onClick={displayPopup}
        />
      </div>
      <img
        className="w-12 h-12 rounded-full object-cover mt-auto mb-10 cursor-pointer hidden md:block"
        src={currentUser?.imageLink || user}
        alt="user"
        onClick={displayPopup}
      />
      {popupVisible && (
        <div className="absolute top-16 left-16 md:left-64 z-[101]">
          <VentanaPerfil />
        </div>
      )}
    </div>
  );
}
