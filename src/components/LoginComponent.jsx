// src/components/LoginComponent.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: LoginComponent.jsx
 * Descripción: Este componente permite a los usuarios iniciar sesión en la aplicación.
 */

import React, { useState } from "react";
import { iniciarSesion, cerrarSesion } from "../server/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Componente de inicio de sesión.
 *
 * @returns {JSX.Element} El componente de inicio de sesión.
 */
export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({}); 
  /**
   * Maneja el inicio de sesión del usuario.
   */
  const login = async () => {
    try {
      let res = await iniciarSesion(credentials.email, credentials.password); 
      if (res.user.emailVerified) {
        toast.success("¡Sesión iniciada con éxito!");
        localStorage.setItem("userEmail", res.user.email); 
        navigate("/home"); 
      } else {
        await cerrarSesion(); 
        toast.error("Por favor, verifica tu correo electrónico antes de iniciar sesión.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Por favor, revisa tus credenciales");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-4">Iniciar Sesión</h1>
        <div className="flex flex-col gap-4">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-green-600 text-black"
            placeholder="Email"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md outline-none focus:border-green-600 text-black"
            placeholder="Contraseña"
          />
        </div>
        <button
          onClick={login}
          className="w-full p-3 bg-green-600 text-white rounded-md font-bold mt-4 transition hover:bg-green-700"
        >
          Iniciar Sesión
        </button>
        <hr className="my-8 border-gray-300" />
        <div className="text-center">
          <p className="text-green-500">
            ¿Eres nuevo?{" "}
            <span
              className="text-green-700 font-bold cursor-pointer underline"
              onClick={() => navigate("/register")}
            >
              Únete
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
