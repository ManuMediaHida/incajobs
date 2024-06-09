// src/layouts/ContactosLayout.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ContactosLayout.jsx
 * Descripción: Este archivo define el diseño de la página de contactos, incluyendo la barra de navegación vertical (Vbar), la barra de navegación superior (NavbarContactos) y el contenido de la página de contactos (ContactosComponent).
 */

import React, { useMemo, useState } from "react";
import ContactosComponent from "../components/contactos/ContactosComponent";
import { obtenerUsuarioActual } from "../server/Firestore";
import Vbar from "../components/Vbar";
import NavbarContactos from "../components/navbar/NavbarContactos";

/**
 * Componente de diseño para la página de Contactos.
 *
 * @returns {JSX.Element} El diseño de la página de Contactos.
 */
export default function ContactosLayout() {
  const [currentUser, setCurrentUser] = useState({});

  // Obtener el usuario actual al montar el componente
  useMemo(() => {
    obtenerUsuarioActual(setCurrentUser);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Barra de navegación vertical */}
      <Vbar currentUser={currentUser} />
      <div className="flex flex-col flex-grow md:ml-16">
        {/* Barra de navegación superior */}
        <NavbarContactos />
        {/* Componente principal de Contactos */}
        <ContactosComponent currentUser={currentUser} />
      </div>
    </div>
  );
}
