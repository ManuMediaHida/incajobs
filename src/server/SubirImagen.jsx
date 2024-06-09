// src/api/ImageUpload.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: ImageUpload.jsx
 * Descripción: Este archivo maneja la subida de imágenes a Firebase Storage y actualiza los perfiles de usuario y publicaciones.
 */

import { storage } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { editarPerfil } from "./Firestore";

// Función para subir una imagen de perfil
export const subirImagenPerfil = (file, userId, setModalOpen, setProgress, setCurrentImage) => {
  if (!file) {
    console.error("No se proporcionó un archivo para subir");
    return;
  }

  const profilePicsRef = ref(storage, `profileImages/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.error("Error subiendo imagen: ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        editarPerfil(userId, { imageLink: response });
        setModalOpen(false);
        setCurrentImage(null);
        setProgress(0);
      });
    }
  );
};

// Función para subir una imagen para una publicación
export const subirImagenPost = (file, setPostImage, setProgress) => {
  if (!file) {
    console.error("No se proporcionó un archivo para subir");
    return;
  }

  const postPicsRef = ref(storage, `postImages/${file.name}`);
  const uploadTask = uploadBytesResumable(postPicsRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    (error) => {
      console.error("Error subiendo imagen: ", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
        setPostImage(response);
      });
    }
  );
};
