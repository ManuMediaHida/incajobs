/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Login.jsx
 * Descripción: Página de inicio de sesión con autenticación y redirección 
 * basada en el estado de autenticación del usuario. Incluye un efecto de 
 * tipeo para mostrar el eslogan.
 ***********************************************/

import React, { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent"; // Componente de inicio de sesión
import { onAuthStateChanged } from "firebase/auth"; // Firebase para autenticación
import { useNavigate } from "react-router-dom"; // Hook para navegación
import { auth } from "../firebaseConfig"; // Configuración de Firebase
import Cargador from "../utils/Cargador"; // Componente de cargador

// Componente principal de la página de inicio de sesión
export default function Login() {
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargador
  const [typedText, setTypedText] = useState(''); // Estado para el efecto de tipeo
  const slogan = "IncaJobs: Conectamos formación con vocación"; // Eslogan de la app
  const navigate = useNavigate(); // Hook para navegación

  // Hook de efecto para manejar el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home"); // Navega a la página de inicio si el usuario está autenticado
      } else {
        setLoading(false); // Deja de mostrar el cargador si el usuario no está autenticado
      }
    });

    // Efecto de tipeo para mostrar el eslogan
    const typeEffect = () => {
      setTypedText((prevText) => {
        const nextIndex = prevText.length;
        if (nextIndex < slogan.length) {
          return prevText + slogan.charAt(nextIndex);
        } else {
          return prevText;
        }
      });
    };

    const interval = setInterval(typeEffect, 100);

    // Cleanup del efecto
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [navigate, slogan]);

  if (loading) return <Cargador />; // Muestra el componente de cargador mientras se verifica la autenticación

  return (
    <div className="bg-green-600 min-h-screen flex flex-col items-center justify-center">
      <div className="text-white text-center max-w-xl mx-auto px-4">
        <div className="mb-12">
          <img src="/incajobs_logo.png" alt="IncaJobs" className="w-32 h-32 rounded-full shadow-lg mx-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-6">{typedText}</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <LoginComponent /> {/* Componente de formulario de inicio de sesión */}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Recursos para instituciones educativas</h2>
            <p>Descubre herramientas y materiales para mejorar la calidad de la formación en tu institución.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Bolsa de trabajo</h2>
            <p>Encuentra oportunidades laborales y prácticas profesionales para estudiantes.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Testimonios de éxito</h2>
            <p>Lee historias inspiradoras de personas que han encontrado empleo gracias a IncaJobs.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Blog</h2>
            <p>Explora artículos y noticias relacionadas con el mundo laboral y la educación.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
