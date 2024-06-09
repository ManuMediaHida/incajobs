// src/components/curriculum/Idiomas.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Idiomas.jsx
 * Descripción: Este componente permite gestionar los idiomas de un usuario, añadiendo, editando y eliminando entradas de idiomas.
 */

import React from "react";

const idiomaOptions = ["Inglés", "Francés", "Alemán", "Español", "Italiano", "Chino"];
const nivelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];

/**
 * Componente para gestionar los idiomas.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.data - La lista de idiomas.
 * @param {Function} props.setData - La función para actualizar la lista de idiomas.
 * @returns {JSX.Element} El componente de idiomas.
 */
export default function Idiomas({ data, setData }) {
  
  /**
   * Maneja los cambios en los campos de entrada.
   *
   * @param {number} index - El índice del elemento que se está editando.
   * @param {string} field - El campo que se está editando.
   * @param {string} value - El nuevo valor del campo.
   */
  const handleChange = (index, field, value) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };

  /**
   * Añade una nueva entrada de idioma.
   */
  const handleAdd = () => {
    setData([...data, { idioma: "", nivel: "", fechaObtencion: "", certificacion: "" }]);
  };

  /**
   * Elimina una entrada de idioma.
   *
   * @param {number} index - El índice del elemento que se va a eliminar.
   */
  const handleRemove = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Idiomas</h2>
      {data.map((item, index) => (
        <div key={index} className="w-full mb-5 p-5 bg-gray-50 rounded-md shadow-sm">
          <select
            value={item.idioma}
            onChange={(e) => handleChange(index, "idioma", e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar Idioma</option>
            {idiomaOptions.map((idioma) => (
              <option key={idioma} value={idioma}>
                {idioma}
              </option>
            ))}
          </select>
          <select
            value={item.nivel}
            onChange={(e) => handleChange(index, "nivel", e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar Nivel</option>
            {nivelOptions.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={item.fechaObtencion}
            onChange={(e) => handleChange(index, "fechaObtencion", e.target.value)}
            placeholder="Fecha de Obtención"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.certificacion}
            onChange={(e) => handleChange(index, "certificacion", e.target.value)}
            placeholder="Certificación"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => handleRemove(index)}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-2 hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Añadir Idioma
      </button>
    </div>
  );
}
