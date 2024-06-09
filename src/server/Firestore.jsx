// src/api/Firestore.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: FirebaseFunctions.jsx
 * Descripción: Este archivo maneja las interacciones con Firestore y la autenticación de usuarios,
 * proporcionando funcionalidades para crear, actualizar, y borrar datos de usuario, posts, y más.
 */

import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query, 
  where,
  setDoc,
  deleteDoc,
  orderBy,
  Timestamp,
  getDoc,
  getDocs,
  arrayUnion,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { firestore } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 

const auth = getAuth(); 

const db = firestore; 
const postsRef = collection(db, "posts");
const userRef = collection(db, "users");
const likeRef = collection(db, "likes");
const commentsRef = collection(db, "comments");
const connectionRef = collection(db, "connections");
const notificationsRef = collection(db, "notifications");

// Publicar datos de usuario en Firestore
export const publicarDatosUsuario = async (object) => {
  try {
    await addDoc(userRef, object);
  } catch (err) {
    console.error("Error al publicar datos de usuario: ", err);
  }
};

// Editar perfil de usuario
export const editarPerfil = async (userID, payload) => {
  try {
    const userToEdit = doc(userRef, userID);
    await updateDoc(userToEdit, payload);
    toast.success("Perfil actualizado correctamente");
  } catch (err) {
    console.error("Error actualizando perfil: ", err);
  }
};

// Actualizar una oferta de trabajo
export const actualizarOferta = async (id, status, postImage) => {
  try {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, { status, postImage, timeStamp: new Date() });
  } catch (error) {
    console.error("Error actualizando la oferta:", error);
    throw error;
  }
};

// Borrar una oferta de trabajo
export const borrarOferta = async (id) => {
  try {
    const docToDelete = doc(postsRef, id);
    await deleteDoc(docToDelete);
    toast.success("Oferta de trabajo borrada con éxito");
  } catch (err) {
    console.error("Error borrando oferta de trabajo ", err);
  }
};

// Obtener conexiones entre usuarios
export const obtenerConexiones = (userId, targetId, setIsConnected) => {
  const connectionsQuery = query(connectionRef, where("targetId", "==", targetId));
  onSnapshot(connectionsQuery, (response) => {
    const connections = response.docs.map((doc) => doc.data());
    const isConnected = connections.some((connection) => connection.userId === userId);
    setIsConnected(isConnected);
  });
};

// Publicar un nuevo estado o post
export const publicarEstado = async (post) => {
  try {
    const postWithTimestamp = { ...post, timeStamp: Timestamp.fromDate(new Date()) };
    await addDoc(postsRef, postWithTimestamp);
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
  }
};

// Obtener todos los posts de un usuario específico
export const obtenerPostsUsuario = (userID, setPosts) => {
  if (!userID) {
    console.error("ID de usuario no definido");
    return;
  }
  const q = query(postsRef, where("userID", "==", userID), orderBy("timeStamp", "desc"));
  onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timeStamp: doc.data().timeStamp.toDate(),
    }));
    setPosts(posts);
  });
};

// Obtener todos los posts
export const obtenerTodosLosPosts = async (setPosts) => {
  const q = query(postsRef);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setPosts(posts);
};

// Obtener currículum de un usuario
export const obtenerCurriculum = async (userId, setCurriculumData) => {
  try {
    const curriculumRef = doc(db, "curriculums", userId);
    const docSnap = await getDoc(curriculumRef);
    if (docSnap.exists()) {
      setCurriculumData(docSnap.data());
    } else {
      setCurriculumData({
        formacion: [],
        idiomas: [],
        tecnologias: [],
        experiencia: []
      });
    }
  } catch (error) {
    console.error("Error obteniendo curriculum: ", error);
  }
};

// Guardar currículum de un usuario
export const guardarCurriculum = async (userId, curriculumData) => {
  try {
    const curriculumRef = doc(db, "curriculums", userId);
    await setDoc(curriculumRef, curriculumData);
  } catch (error) {
    console.error("Error guardando curriculum: ", error);
  }
};

// Obtener datos del currículum de un usuario
export const obtenerDatosCurriculum = async (userId) => {
  try {
    const docRef = doc(db, "curriculums", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No existe dicho curriculum!");
      return {};
    }
  } catch (error) {
    console.error("Error obteniendo documento: ", error);
    return {};
  }
};

// Obtener un único estado de un usuario
export const obtenerEstadoUnico = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }))
    );
  });
};

// Obtener usuario por correo electrónico
export const obtenerUsuarioPorEmail = async (email) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("No existe dicho usuario!");
    }
    const userData = querySnapshot.docs[0].data();
    return { id: querySnapshot.docs[0].id, ...userData };
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
};

// Obtener el usuario actual por correo electrónico
export const obtenerUsuarioActualPorEmail = async (email) => {
  if (!email || typeof email !== 'string') {
    console.error("El correo electrónico no está definido o no es una cadena de texto");
    return null;
  }

  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { ...userData, id: querySnapshot.docs[0].id };
    }
    return null;
  } catch (error) {
    console.error("Error obteniendo el usuario: ", error);
    return null;
  }
};

const messagesRef = collection(firestore, "messages");

// Obtener mensajes de un chat
export const obtenerMensajesChat = (userId, chatPartnerId, setMessages) => {
  const q = query(
    messagesRef,
    where("participants", "array-contains", userId),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs
      .map((doc) => doc.data())
      .filter(
        (msg) =>
          (msg.senderId === userId && msg.receiverId === chatPartnerId) ||
          (msg.senderId === chatPartnerId && msg.receiverId === userId)
      );
    setMessages(messages);
  });
};

// Obtener todos los estados
export const obtenerEstados = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp", "desc"));
  onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timeStamp: doc.data().timeStamp.toDate(),
    }));
    console.log("Publicaciones obtenidas:", posts);
    setAllStatus((prevStatuses) => {
      const combinedStatuses = [...prevStatuses, ...posts];
      const uniqueStatuses = combinedStatuses.filter((status, index, self) =>
        index === self.findIndex((s) => s.id === status.id)
      );
      return uniqueStatuses;
    });
  });
};

// Obtener conexiones por ID de usuario
export const obtenerConexionesPorIdUsuario = async (userId, setContacts) => {
  try {
    const q = query(connectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No se encontraron conexiones");
      setContacts([]);
      return;
    }

    const contactPromises = querySnapshot.docs.map(async (connectionDoc) => {
      const targetId = connectionDoc.data().targetId;
      const userDoc = await getDoc(doc(userRef, targetId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    });

    const contacts = (await Promise.all(contactPromises)).filter(Boolean);
    setContacts(contacts);
  } catch (err) {
    console.error("Error obteniendo conexiones: ", err);
    setContacts([]);
  }
};

// Enviar mensaje en un chat
export const enviarMensaje = async (chatId, message, senderId, receiverId) => {
  try {
    const chatRef = collection(db, "chats", chatId, "messages");
    await addDoc(chatRef, {
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    });

    const notificationRef = collection(db, "notifications");
    await addDoc(notificationRef, {
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
      read: false,
    });
  } catch (error) {
    console.error("Error enviando mensaje: ", error);
  }
};

// Obtener mensajes de un chat
export const obtenerMensajes = (chatId, setMessages) => {
  try {
    const chatRef = collection(db, "chats", chatId, "messages");
    const q = query(chatRef, orderBy("timestamp", "asc"));
    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });
  } catch (error) {
    console.error("Error obteniendo mensajes: ", error);
  }
};

// Obtener notificaciones de un usuario
export const obtenerNotificaciones = async (userId, setNotifications) => {
  try {
    const q = query(
      notificationsRef,
      where("receiverId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setNotifications([]);
      return;
    }

    const notifications = await Promise.all(
      querySnapshot.docs.map(async (notificationDoc) => {
        const notification = notificationDoc.data();
        const senderDoc = await getDoc(doc(db, "users", notification.senderId));
        const senderName = senderDoc.exists() ? senderDoc.data().name : "Usuario Desconocido";
        return { ...notification, id: notificationDoc.id, senderName };
      })
    );

    setNotifications(notifications);
  } catch (err) {
    console.error("Error obteniendo notificaciones: ", err);
    setNotifications([]);
  }
};

// Marcar una notificación como leída
export const marcarNotificacionComoLeida = async (notificationId) => {
  try {
    const notificationDoc = doc(db, "notifications", notificationId);
    await updateDoc(notificationDoc, { read: true });
    toast.success("Notificación marcada como leída");
  } catch (err) {
    console.error("Error marcando la notificación como leída ", err);
  }
};

// Obtener el usuario actual
export const obtenerUsuarioActual = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser({
        userID: user.uid,
        email: user.email,
      });
    } else {
      setCurrentUser(null);
    }
  });
};

// Obtener usuario por ID
export const obtenerUsuarioPorID = async (id) => {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', id));
    if (!userDoc.exists()) {
      throw new Error("No existe dicho usuario!");
    }
    return { id: userDoc.id, ...userDoc.data() }; 
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
};

// Obtener todos los usuarios
export const obtenerTodosLosUsuarios = async (setUsers) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(users);
  } catch (error) {
    console.error("Error obteniendo todos los usuarios: ", error);
  }
};

// Añadir una conexión entre usuarios
export const añadirConexion = async (currentUserID, userID) => {
  try {
    const connectionRef = doc(db, "connections", currentUserID);
    await updateDoc(connectionRef, {
      connections: arrayUnion(userID)
    });
  } catch (error) {
    console.error("Error añadiendo conexión: ", error);
  }
};

// Obtener todas las publicaciones de una empresa
export const obtenerOfertasEmpresa = (userID, setOfertas, setLoading) => {
  const q = query(collection(db, "posts"), where("userID", "==", userID));
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOfertas(posts);
    if (setLoading) {
      setLoading(false);
    }
  }, (error) => {
    console.error("Error obteniendo publicaciones de la empresa: ", error);
    if (setLoading) {
      setLoading(false);
    }
  });
};

// Obtener todas las ofertas
export const obtenerTodasLasOfertas = async (setOfertas) => {
  try {
    const ofertasRef = collection(db, "posts");
    const q = query(ofertasRef, orderBy("timeStamp", "desc"));
    const querySnapshot = await getDocs(q);
    const ofertas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timeStamp: doc.data().timeStamp.toDate(),
    }));
    setOfertas(ofertas);
  } catch (error) {
    console.error("Error obteniendo todas las ofertas:", error);
    setOfertas([]);
  }
};

// Publicar una nueva oferta
export const publicarOferta = async (post) => {
  try {
    await addDoc(collection(db, "posts"), post);
  } catch (error) {
    console.error("Error publicando oferta: ", error);
  }
};

// Obtener todos los estados
export const getStatus = (setStatuses) => {
  const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const statuses = snapshot.docs.map((doc) => {
      const data = doc.data();
      let timeStamp = data.timeStamp;

      if (timeStamp instanceof Date) {
        timeStamp = timeStamp;
      } else if (typeof timeStamp === 'string') {
        timeStamp = new Date(timeStamp);
      } else if (timeStamp && timeStamp.toDate) {
        timeStamp = timeStamp.toDate();
      }

      return {
        id: doc.id,
        ...data,
        timeStamp: timeStamp,
      };
    });
    setStatuses(statuses);
  }, (error) => {
    console.error("Error obteniendo estados: ", error);
  });
};

// Dar me gusta a una publicación
export const darMeGusta = async (userId, postId, liked) => {
  try {
    const likeDocRef = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      await deleteDoc(likeDocRef);
    } else {
      await setDoc(likeDocRef, { userId, postId });
    }
  } catch (err) {
    console.error("Error dando me gusta a la publicación: ", err);
  }
};

// Obtener los likes de una publicación por usuario
export const obtenerLikesPorUsuario = (userId, postId, setLiked, setLikesCount) => {
  const likeQuery = query(likeRef, where("postId", "==", postId));
  onSnapshot(likeQuery, (response) => {
    const likes = response.docs.map((doc) => doc.data());
    const likesCount = likes.length;
    const isLiked = likes.some((like) => like.userId === userId);
    setLikesCount(likesCount);
    setLiked(isLiked);
  });
};

// Publicar un comentario
export const publicarComentario = async (postId, comment, timeStamp, name) => {
  try {
    await addDoc(commentsRef, { postId, comment, timeStamp, name });
  } catch (err) {
    console.error("Error publicando comentario: ", err);
  }
};

// Obtener comentarios de una publicación
export const obtenerComentarios = (postId, setComments) => {
  const commentsQuery = query(commentsRef, where("postId", "==", postId));
  onSnapshot(commentsQuery, (response) => {
    const comments = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComments(comments);
  });
};
