// src/components/navbar/NavbarContactos.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: NavbarContactos.jsx
 * Descripción: Este componente muestra una barra de navegación para buscar contactos, incluyendo iconos de redes sociales y un campo de búsqueda.
 */

import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { obtenerTodosLosUsuarios } from "../../server/Firestore";
import BuscarContacto from "../contactos/BuscarContacto"; // Importar el componente BuscarContacto

/**
 * Componente para la barra de navegación de búsqueda de contactos.
 *
 * @returns {JSX.Element} El componente de la barra de navegación.
 */
export default function NavbarContactos() {
  const [popupVisible, setPopupVisible] = useState(false); // Estado para controlar la visibilidad del popup
  const [isSearch, setIsSearch] = useState(false); // Estado para controlar si se está buscando
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [filteredUsers, setFilteredUsers] = useState([]); // Estado para almacenar los usuarios filtrados
  const [searchInput, setSearchInput] = useState(""); // Estado para el campo de búsqueda
  let navigate = useNavigate();

  /**
   * Función para navegar a una ruta específica.
   *
   * @param {string} route - La ruta a la que se quiere navegar.
   */
  const goToRoute = (route) => {
    navigate(route);
  };

  /**
   * Función para abrir el perfil de un usuario.
   *
   * @param {Object} user - El usuario cuyos datos se quieren ver.
   */
  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  /**
   * Función para manejar la búsqueda de usuarios.
   */
  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    obtenerTodosLosUsuarios(setUsers);
  }, []);

  return (
    <div className="flex items-center justify-between p-5 bg-green-600 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2 hidden md:block">
        Buscar Contactos
      </div>
      <div className="flex items-center gap-2 sm:gap-5 ml-auto relative">
        <BuscarContacto setIsSearch={setIsSearch} setSearchInput={setSearchInput} />
        <FaInstagram
          className="hidden sm:block text-white cursor-pointer text-2xl hover:text-yellow-400"
          onClick={() => goToRoute("/instagram")}
        />
        <FaTwitter
          className="hidden sm:block text-white cursor-pointer text-2xl hover:text-yellow-400"
          onClick={() => goToRoute("/twitter")}
        />
        <FaFacebook
          className="hidden sm:block text-white cursor-pointer text-2xl hover:text-yellow-400"
          onClick={() => goToRoute("/facebook")}
        />
        {searchInput.length === 0 ? null : (
          <div className="absolute top-16 left-0 bg-white border border-gray-300 rounded-md w-full max-h-72 overflow-y-auto z-50">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No hay resultados</div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => openUser(user)}
                >
                  <img
                    src={user.imageLink || user}
                    alt="user"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p className="text-black">{user.name}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
