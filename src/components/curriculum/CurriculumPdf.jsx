// src/components/curriculum/CurriculumPdf.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: CurriculumPdf.jsx
 * Descripción: Este componente muestra el currículum de un usuario, incluyendo su formación, idiomas, tecnologías y experiencia laboral.
 */

import React, { forwardRef, useEffect, useState } from "react";
import { obtenerDatosCurriculum } from "../../server/Firestore";

/**
 * Componente para mostrar el currículum de un usuario.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.user - Los datos del usuario.
 * @param {React.Ref} ref - La referencia para la funcionalidad de impresión.
 * @returns {JSX.Element|null} El componente de currículum.
 */
const CurriculumPdf = forwardRef(({ user }, ref) => {
  const [curriculum, setCurriculum] = useState(null);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      const data = await obtenerDatosCurriculum(user.id);
      setCurriculum(data);
    };

    fetchCurriculumData();
  }, [user.id]);

  if (!curriculum) return null;

  return (
    <div ref={ref} className="p-5 font-sans max-w-3xl mx-auto leading-relaxed">
      {/* Información de perfil del usuario */}
      <div className="flex items-center mb-5">
        <img
          src={user.imageLink}
          alt="Profile"
          className="rounded-full mr-5 w-24 h-24"
        />
        <h1 className="m-0 text-2xl font-bold">{user.name}</h1>
      </div>

      {/* Información de formación académica */}
      <h2 className="border-b pb-1 mb-4 text-xl font-semibold">Formación</h2>
      {curriculum.formacion?.length > 0 ? (
        curriculum.formacion.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="m-0 text-lg font-bold">{item.estudios}</h3>
            <p className="m-1">{item.centro}</p>
            <p className="m-1">{item.localidad}, {item.provincia}, {item.pais}</p>
            <p className="m-1">Estado: {item.estado}</p>
            {item.estado === "finalizado" && (
              <p className="m-1">Fecha de obtención: {item.fechaObtencion}</p>
            )}
            <p className="m-1">Número de horas: {item.horas}</p>
            <p className="m-1">Modalidad: {item.modalidad}</p>
          </div>
        ))
      ) : (
        <p>No hay información de formación.</p>
      )}

      {/* Información de idiomas */}
      <h2 className="border-b pb-1 mb-4 text-xl font-semibold">Idiomas</h2>
      {curriculum.idiomas?.length > 0 ? (
        curriculum.idiomas.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="m-0 text-lg font-bold">{item.nombre} - {item.nivel}</h3>
            <p className="m-1">Fecha de obtención: {item.fechaObtencion}</p>
            <p className="m-1">Certificación: {item.certificacion}</p>
          </div>
        ))
      ) : (
        <p>No hay información de idiomas.</p>
      )}

      {/* Información de tecnologías */}
      <h2 className="border-b pb-1 mb-4 text-xl font-semibold">Tecnologías</h2>
      {curriculum.tecnologias?.length > 0 ? (
        curriculum.tecnologias.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="m-0 text-lg font-bold">{item.tecnologia} - {item.nivel}</h3>
            <p className="m-1">Certificación: {item.certificacion}</p>
          </div>
        ))
      ) : (
        <p>No hay información de tecnologías.</p>
      )}

      {/* Información de experiencia laboral */}
      <h2 className="border-b pb-1 mb-4 text-xl font-semibold">Experiencia Laboral</h2>
      {curriculum.experiencia?.length > 0 ? (
        curriculum.experiencia.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="m-0 text-lg font-bold">{item.puesto} en {item.empresa}</h3>
            <p className="m-1">Fecha de inicio: {item.fechaInicio}</p>
            {item.fechaFin && <p className="m-1">Fecha de fin: {item.fechaFin}</p>}
            <p className="m-1">Tipo: {item.tipo}</p>
            <p className="m-1">Departamento: {item.departamento}</p>
          </div>
        ))
      ) : (
        <p>No hay información de experiencia laboral.</p>
      )}
    </div>
  );
});

export default CurriculumPdf;
