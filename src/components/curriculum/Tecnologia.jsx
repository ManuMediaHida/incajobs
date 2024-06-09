// src/components/curriculum/Tecnologias.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Tecnologias.jsx
 * Descripción: Este componente permite gestionar las tecnologías de un usuario, añadiendo, editando y eliminando entradas de tecnologías.
 */

import React from "react";

const tecnologiaOptions = ["React", "Next.js", "Node.js", "Java", "Python", "C++"];
const nivelOptions = ["Básico", "Intermedio", "Alto"];

/**
 * Componente para gestionar las tecnologías.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.data - La lista de tecnologías.
 * @param {Function} props.setData - La función para actualizar la lista de tecnologías.
 * @returns {JSX.Element} El componente de tecnologías.
 */
export default function Tecnologias({ data, setData }) {

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
   * Añade una nueva entrada de tecnología.
   */
  const handleAdd = () => {
    setData([...data, { tecnologia: "", nivel: "", certificacion: "" }]);
  };

  /**
   * Elimina una entrada de tecnología.
   *
   * @param {number} index - El índice del elemento que se va a eliminar.
   */
  const handleRemove = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Tecnologías</h2>
      {data.map((item, index) => (
        <div key={index} className="w-full mb-5 p-5 bg-gray-50 rounded-md shadow-sm">
          <select
            value={item.tecnologia}
            onChange={(e) => handleChange(index, "tecnologia", e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar Tecnología</option>
            {tecnologiaOptions.map((tecnologia) => (
              <option key={tecnologia} value={tecnologia}>
                {tecnologia}
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
        Añadir Tecnología
      </button>
    </div>
  );
}
