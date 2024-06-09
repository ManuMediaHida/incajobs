/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: main.jsx
 * Descripción: Punto de entrada principal de la aplicación React, configura el enrutamiento, 
 * contexto de usuario, contexto de búsqueda y notificaciones.
 ***********************************************/

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import { UserProvider } from "./UserContext";
import { SearchProvider } from "./SearchContext";

// Renderiza la aplicación principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SearchProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </SearchProvider>
    </UserProvider>
  </React.StrictMode>
);
