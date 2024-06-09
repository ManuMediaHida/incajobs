/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: PerfilUsuarioPage.jsx
 * Descripción: Página del perfil de usuario que obtiene y muestra la información de un usuario específico basado en su ID.
 ***********************************************/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerUsuarioPorID } from "../server/Firestore";

/**
 * Componente para la página del perfil de un usuario específico.
 *
 * @returns {JSX.Element} La estructura de la página del perfil del usuario.
 */
const PerfilUsuarioPage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para obtener los datos del usuario basándose en su ID.
  useEffect(() => {
    if (!userId) {
      console.error("ID no proporcionado en la URL");
      setError(new Error("ID no proporcionado en la URL"));
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await obtenerUsuarioPorID(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error obteniendo usuario: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Manejo de los diferentes estados de carga, error y datos no encontrados.
  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  if (!userData) return <div className="text-center py-10">No se encontraron datos del usuario</div>;

  // Renderización de la página de perfil de usuario.
  return (
    <div className="flex flex-col items-center py-10">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={userData.imageLink || "https://via.placeholder.com/150"}
            alt="Perfil"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">{userData.name}</h1>
        <p className="text-center text-gray-600 mb-4">{userData.email}</p>
        {/* Mostrar detalles específicos dependiendo del rol */}
        {userData.role === "empresa" ? (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2">Nombre de la Empresa: {userData.nombreEmpresa || "No especificada"}</p>
            <p className="text-gray-600 mb-2">CIF: {userData.companyCIF || "No especificado"}</p>
            <p className="text-gray-600 mb-2">Ubicación: {userData.companyLocation || "No especificada"}</p>
            <p className="text-gray-600 mb-2">Código Postal: {userData.postalCode || "No especificado"}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2">Rol: {userData.role || "No especificado"}</p>
            <p className="text-gray-600 mb-2">Ubicación: {userData.municipality || "No especificada"}</p>
            <p className="text-gray-600 mb-2">Código Postal: {userData.postalCode || "No especificado"}</p>
            <p className="text-gray-600 mb-2">NIA: {userData.nia || "No especificado"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuarioPage;
