/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: PerfilPage.jsx
 * Descripción: Página del perfil del usuario que verifica la autenticación del usuario antes de mostrar el componente de perfil.
 ***********************************************/

import React, { useEffect, useState } from "react";
import PerfilComponent from "../components/perfil/PerfilComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Cargador from "../utils/Cargador";

/**
 * Componente para la página del perfil del usuario.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.currentUser - Usuario actual autenticado.
 * @returns {JSX.Element} La estructura de la página del perfil.
 */
export default function PerfilPage({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  // Efecto para verificar el estado de autenticación del usuario.
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? <Cargador /> : <PerfilComponent currentUser={currentUser} />}
    </div>
  );
}
