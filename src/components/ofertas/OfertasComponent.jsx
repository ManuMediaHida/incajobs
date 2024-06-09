// src/components/ofertas/OfertasComponent.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: OfertasComponent.jsx
 * Descripción: Este componente muestra todas las ofertas de trabajo, permitiendo filtrar y actualizar ofertas. Incluye un componente para actualizar ofertas si el usuario actual es una empresa.
 */

import React, { useEffect, useState, useContext } from "react";
import { getStatus } from "../../server/Firestore";
import Oferta from "./Oferta";
import ActualizarOferta from "./ActualizarOferta";
import { SearchContext } from "../../SearchContext";
import { UserContext } from "../../UserContext";

/**
 * Componente para mostrar y gestionar las ofertas de trabajo.
 *
 * @returns {JSX.Element} El componente de ofertas.
 */
export default function OfertasComponent() {
  const [allStatuses, setAllStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchInput } = useContext(SearchContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log("Fetching status updates");
    const fetchData = async () => {
      try {
        await getStatus(setAllStatus);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  /**
   * Elimina ofertas duplicadas basándose en el ID de la oferta.
   *
   * @param {Array} posts - La lista de ofertas.
   * @returns {Array} La lista de ofertas sin duplicados.
   */
  const removeDuplicates = (posts) => {
    const uniquePosts = [];
    const postIds = new Set();

    posts.forEach((post) => {
      if (!postIds.has(post.id)) {
        uniquePosts.push(post);
        postIds.add(post.id);
      }
    });

    return uniquePosts;
  };

  const filteredStatuses = removeDuplicates(
    allStatuses.filter((post) =>
      post.status.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  console.log("All statuses:", allStatuses);
  console.log("Filtered statuses:", filteredStatuses);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      {currentUser && currentUser.role === "empresa" && (
        <ActualizarOferta currentUser={currentUser} />
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && filteredStatuses.map((post) => (
        <Oferta key={post.id} posts={post} currentUser={currentUser} />
      ))}
    </div>
  );
}
