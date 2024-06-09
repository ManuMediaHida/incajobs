/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: CurriculumPage.jsx
 * Descripción: Página del currículum que muestra y permite editar 
 * la formación, idiomas, tecnologías y experiencia laboral del usuario.
 ***********************************************/

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Cargador from "../utils/Cargador";
import { obtenerCurriculum, guardarCurriculum } from "../server/Firestore";
import { UserContext } from "../UserContext";
import Formacion from "../components/curriculum/Formacion";
import Idioma from "../components/curriculum/Idioma"; 
import Tecnologia from "../components/curriculum/Tecnologia"; 
import ExperienciaLaboral from "../components/curriculum/ExperienciaLaboral";

/**
 * Componente para la página del currículum.
 *
 * @returns {JSX.Element} La estructura de la página del currículum.
 */
export default function CurriculumPage() {
  const [loading, setLoading] = useState(true); // Estado de carga
  const [curriculumData, setCurriculumData] = useState({
    formacion: [],
    idiomas: [],
    tecnologias: [],
    experiencia: [],
  });
  const { currentUser } = useContext(UserContext); // Contexto del usuario actual
  const navigate = useNavigate(); // Hook para la navegación

  // Efecto para verificar el estado de autenticación del usuario.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Navega a la página principal si no hay usuario autenticado
      } else {
        setLoading(false); // Detiene la carga si hay usuario autenticado
      }
    });
    return unsubscribe; // Cleanup del efecto
  }, [navigate]);

  // Efecto para obtener los datos del currículum del usuario actual.
  useEffect(() => {
    if (currentUser) {
      obtenerCurriculum(currentUser.id, setCurriculumData);
    }
  }, [currentUser]);

  // Maneja la acción de guardar el currículum.
  const handleSave = () => {
    guardarCurriculum(currentUser.id, curriculumData);
  };

  if (loading) return <Cargador />; // Muestra el componente de cargador mientras se verifica la autenticación

  return (
    <div className="p-20 max-w-800 mx-auto mt-20">
      <h1 className="text-center mb-20">Currículum de {currentUser?.name}</h1>
      <Formacion
        data={curriculumData.formacion}
        setData={(formacion) =>
          setCurriculumData({ ...curriculumData, formacion })
        }
      />
      <Idioma
        data={curriculumData.idiomas}
        setData={(idiomas) =>
          setCurriculumData({ ...curriculumData, idiomas })
        }
      />
      <Tecnologia
        data={curriculumData.tecnologias}
        setData={(tecnologias) =>
          setCurriculumData({ ...curriculumData, tecnologias })
        }
      />
      <ExperienciaLaboral
        data={curriculumData.experiencia}
        setData={(experiencia) =>
          setCurriculumData({ ...curriculumData, experiencia })
        }
      />
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
