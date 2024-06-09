import React, { useEffect, useState } from "react";
import { obtenerUsuarioActual } from "../server/Auth";
import { useNavigate } from "react-router-dom";
import Cargador from "../utils/Cargador";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Llama a obtenerUsuarioActual y pasa setCurrentUser
    obtenerUsuarioActual(setCurrentUser);

    // Observa los cambios en currentUser
    if (currentUser) {
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [currentUser, navigate]);

  if (loading) return <Cargador />;

  return (
    <div className="bg-green-600 min-h-screen flex flex-col items-center justify-center">
      <div className="text-white text-center max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">IncaJobs: Conectamos formación con vocación</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
