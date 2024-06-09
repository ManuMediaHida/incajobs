// src/components/curriculum/Formacion.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Formacion.jsx
 * Descripción: Este componente permite gestionar la formación académica de un usuario, añadiendo, editando y eliminando entradas de formación.
 */

import React from "react";

/**
 * Componente para gestionar la formación académica.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.data - La lista de formaciones académicas.
 * @param {Function} props.setData - La función para actualizar la lista de formaciones académicas.
 * @returns {JSX.Element} El componente de formación académica.
 */
export default function Formacion({ data, setData }) {
  
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
   * Añade una nueva entrada de formación académica.
   */
  const handleAdd = () => {
    setData([
      ...data,
      {
        centro: "",
        localidad: "",
        provincia: "",
        pais: "",
        estudios: "",
        estado: "",
        fechaObtencion: "",
        horas: "",
        modalidad: "",
      },
    ]);
  };

  /**
   * Elimina una entrada de formación académica.
   *
   * @param {number} index - El índice del elemento que se va a eliminar.
   */
  const handleRemove = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white p-5 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Formación Académica</h2>
      {data.map((item, index) => (
        <div key={index} className="w-full mb-5 p-5 bg-gray-50 rounded-md shadow-sm">
          <input
            type="text"
            value={item.centro}
            onChange={(e) => handleChange(index, "centro", e.target.value)}
            placeholder="Centro"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.localidad}
            onChange={(e) => handleChange(index, "localidad", e.target.value)}
            placeholder="Localidad"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.provincia}
            onChange={(e) => handleChange(index, "provincia", e.target.value)}
            placeholder="Provincia"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.pais}
            onChange={(e) => handleChange(index, "pais", e.target.value)}
            placeholder="País"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.estudios}
            onChange={(e) => handleChange(index, "estudios", e.target.value)}
            placeholder="Estudios"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.estado}
            onChange={(e) => handleChange(index, "estado", e.target.value)}
            placeholder="Estado"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={item.fechaObtencion}
            onChange={(e) => handleChange(index, "fechaObtencion", e.target.value)}
            placeholder="Fecha de Obtención"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={item.horas}
            onChange={(e) => handleChange(index, "horas", e.target.value)}
            placeholder="Horas"
            className="w-full mb-3 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={item.modalidad}
            onChange={(e) => handleChange(index, "modalidad", e.target.value)}
            placeholder="Modalidad"
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
        Añadir Formación
      </button>
    </div>
  );
}
