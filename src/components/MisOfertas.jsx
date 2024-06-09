import React, { useEffect, useState, useContext } from "react";
import { obtenerOfertasEmpresa } from "../server/Firestore";
import Oferta from "./ofertas/Oferta";
import { UserContext } from "../UserContext";

export default function MisOfetas() {
  const [companyPosts, setCompanyPosts] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser?.id && currentUser.role === "empresa") {
      obtenerOfertasEmpresa(currentUser.id, setCompanyPosts);
    }
  }, [currentUser]);

  const getEditData = (post) => {
    // Lógica para abrir el modal de edición
    console.log("Editando oferta:", post);
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-5 text-center">
      </h1>
      {companyPosts.length === 0 ? (
        <p className="text-lg text-gray-600 mt-5 text-center">
          No has publicado ninguna oferta de trabajo.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {companyPosts.map((post) => (
            <Oferta key={post.id} posts={post} currentUser={currentUser} getEditData={getEditData} />
          ))}
        </div>
      )}
    </div>
  );
}
