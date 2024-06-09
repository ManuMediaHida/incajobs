/***********************************************
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: Routes.jsx
 * Descripción: Configuración de las rutas de la aplicación usando react-router-dom.
 ***********************************************/

import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import HomeLayout from "./layouts/OfertasLayout";
import ConnectionLayout from "./layouts/ContactosLayout";
import CompanyLayout from "./layouts/MisOfertasLayout";
import CurriculumLayout from "./layouts/CurriculumLayout";
import AgendaLayout from "./layouts/AgendaLayout";
import NotificationLayout from "./layouts/NotificacionesLayout";
import NotificacionesPage from "./Pages/NotificacionesPage";
import ChatPage from "./Pages/ChatPage";
import OfertasPage from "./Pages/OfertasPage";
import MisOfertasPage from "./Pages/MisOfertasPage";
import CurriculumPage from "./Pages/CurriculumPage";
import AgendaPage from "./Pages/AgendaPage";
import PerfilPage from "./Pages/PerfilPage";
import ContactosPage from "./Pages/ContactosPage";
import PerfilLayout from "./layouts/PerfilLayout";
import PerfilUsuarioPage from "./Pages/PerfilUsuarioPage";
import PerfilUsuarioLayout from "./layouts/PerfilUsuarioLayout";

// Definición de las rutas de la aplicación
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Página de inicio de sesión
  },
  {
    path: "/register",
    element: <Register />, // Página de registro
  },
  {
    path: "/home",
    element: <HomeLayout />, // Layout principal después de iniciar sesión
    children: [
      {
        path: "/home",
        element: <OfertasPage />, // Página de ofertas de trabajo
      },
    ],
  },
  {
    path: "/profile",
    element: <PerfilLayout />, // Layout del perfil del usuario
    children: [
      {
        path: "/profile",
        element: <PerfilPage />, // Página del perfil del usuario
      },
      {
        path: "/profile/:userId",
        element: <PerfilUsuarioPage />, // Página del perfil de otro usuario
      },
    ],
  },
  {
    path: "/connections",
    element: <ConnectionLayout />, // Layout de conexiones de usuarios
    children: [
      {
        path: "/connections",
        element: <ContactosPage />, // Página de contactos
      },
    ],
  },
  {
    path: "/company-posts",
    element: <CompanyLayout />, // Layout de publicaciones de la empresa
    children: [
      {
        path: "/company-posts",
        element: <MisOfertasPage />, // Página de ofertas de la empresa
      },
    ],
  },
  {
    path: "/curriculum",
    element: <CurriculumLayout />, // Layout del currículum del usuario
    children: [
      {
        path: "/curriculum",
        element: <CurriculumPage />, // Página del currículum del usuario
      },
    ],
  },
  {
    path: "/my-contacts",
    element: <AgendaLayout />, // Layout de la agenda de contactos
    children: [
      {
        path: "/my-contacts",
        element: <AgendaPage />, // Página de la agenda de contactos
      },
    ],
  },
  {
    path: "/notifications",
    element: <NotificationLayout />, // Layout de notificaciones
    children: [
      {
        path: "/notifications",
        element: <NotificacionesPage />, // Página de notificaciones
      },
    ],
  },
  {
    path: "/user-profile/:userId",
    element: <PerfilUsuarioLayout />, // Layout del perfil de otro usuario
    children: [
      {
        path: "",
        element: <PerfilUsuarioPage />, // Página del perfil de otro usuario
      },
    ],
  },
  {
    path: "/chat",
    element: <ChatPage />, // Página de chat
  },
]);
