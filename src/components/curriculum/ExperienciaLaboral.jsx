// src/components/curriculum/ExperienciaLaboral.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ExperienciaLaboral.jsx
 * Descripción: Este componente permite gestionar la experiencia laboral de un usuario, añadiendo, editando y eliminando entradas de experiencia laboral.
 */

import React from "react";

const tipoOptions = ["Parcial", "Completa"];

/**
 * Componente para gestionar la experiencia laboral.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.data - La lista de experiencias laborales.
 * @param {Function} props.setData - La función para actualizar la lista de experiencias laborales.
 * @returns {JSX.Element} El componente de experiencia laboral.
 */
export default function ExperienciaLaboral({ data = [], setData }) {
  
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
   * Añade una nueva entrada de experiencia laboral.
   */
  const handleAdd = () => {
    setData([
      ...data,
      {
        empresa: "",
        tipo: "",
        fechaInicio: "",
        fechaFin: "",
        puesto: "",
        departamento: "",
      },
    ]);
  };

  /**
   * Elimina una entrada de experiencia laboral.
   *
   * @param {number} index - El índice del elemento que se va a eliminar.
   */
  const handleRemove = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Experiencia Laboral</h2>
      {data.map((item, index) => (
        <div key={index} className="w-full mb-5 p-5 bg-gray-50 rounded-md shadow-sm">
          <input
            type="text"
            value={item.empresa}
            onChange={(e) => handleChange(index, "empresa", e.target.value)}
            placeholder="Empresa"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <select
            value={item.tipo}
            onChange={(e) => handleChange(index, "tipo", e.target.value)}
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccionar Tipo</option>
            {tipoOptions.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={item.fechaInicio}
            onChange={(e) => handleChange(index, "fechaInicio", e.target.value)}
            placeholder="Fecha de Inicio"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={item.fechaFin}
            onChange={(e) => handleChange(index, "fechaFin", e.target.value)}
            placeholder="Fecha de Fin"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.puesto}
            onChange={(e) => handleChange(index, "puesto", e.target.value)}
            placeholder="Puesto"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.departamento}
            onChange={(e) => handleChange(index, "departamento", e.target.value)}
            placeholder="Departamento"
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
        Añadir Experiencia
      </button>
    </div>
  );
}
