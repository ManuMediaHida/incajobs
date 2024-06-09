/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Home.jsx
 * Descripción: Página principal de la aplicación que muestra las ofertas de trabajo disponibles y verifica la autenticación del usuario.
 ***********************************************/

import React, { useEffect, useState } from "react";
import OfertasComponent from "../components/ofertas/OfertasComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Cargador from "../utils/Cargador";

/**
 * Componente para la página principal de la aplicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.currentUser - Usuario actual autenticado.
 * @returns {JSX.Element} La estructura de la página principal.
 */
export default function Home({ currentUser }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Efecto para verificar el estado de autenticación del usuario.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigate]);

  if (loading) return <Cargador />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-f8f9fa">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-4">Bienvenido a Incajobs</h1>
        <p className="text-center text-green-500 mb-8">Conectamos formación con vocación</p>
        <OfertasComponent currentUser={currentUser} />
      </div>
    </div>
  );
}
