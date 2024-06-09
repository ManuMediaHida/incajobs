// src/components/RegisterComponent.jsx

/**
 * Autor: Manuel Mediavilla Hidalgo
 * Nombre del archivo: RegisterComponent.jsx
 * Descripción: Este componente permite a los usuarios registrarse en la aplicación.
 */

import React, { useState } from "react";
import { registrarUsuario, enviarVerificacionEmail, cerrarSesion } from "../server/Auth"; // Importar funciones en español
import { publicarDatosUsuario } from "../server/Firestore";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../utils/getUniqueId";
import { toast } from "react-toastify";
import userImage from '../assets/user.png'; // Asegúrate de que la ruta sea correcta

/**
 * Componente de registro de usuario.
 *
 * @returns {JSX.Element} El componente de registro de usuario.
 */
export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({}); // Estado para almacenar las credenciales del usuario
  const [role, setRole] = useState(''); // Estado para almacenar el rol del usuario
  const [repeatPassword, setRepeatPassword] = useState(''); // Estado para almacenar la repetición de la contraseña
  const [passwordMatch, setPasswordMatch] = useState(true); // Estado para verificar si las contraseñas coinciden

  /**
   * Maneja el registro de un nuevo usuario.
   */
  const register = async () => {
    if (!credentials.password || credentials.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (credentials.password !== repeatPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (!role) {
      toast.error("Por favor, selecciona un rol.");
      return;
    }

    try {
      let res = await registrarUsuario(credentials.email, credentials.password);
      toast.success("¡Cuenta creada! Por favor, verifica tu correo electrónico.");

      const userData = {
        userID: getUniqueID(),
        name: credentials.name,
        email: credentials.email,
        imageLink: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
        role: role
      };

      if (role === 'alumno') {
        Object.assign(userData, {
          nia: credentials.nia,
          birthDate: credentials.birthDate,
          nationality: credentials.nationality,
          gender: credentials.gender,
          municipality: credentials.municipality,
          address: credentials.address,
          postalCode: credentials.postalCode,
          identificationNumber: credentials.identificationNumber,
        });
      } else if (role === 'empresa') {
        Object.assign(userData, {
          nombreEmpresa: credentials.nombreEmpresa,
          companyLocation: credentials.companyLocation,
          companyCIF: credentials.companyCIF,
          address: credentials.address,
          postalCode: credentials.postalCode,
        });
      }

      await publicarDatosUsuario(userData);

      await enviarVerificacionEmail(res.user);

      await cerrarSesion();
      toast.info("Se ha enviado un correo de verificación. Por favor, verifica tu correo antes de iniciar sesión.");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("No se puede crear tu cuenta");
    }
  };

  /**
   * Maneja el cambio en el campo de la contraseña.
   *
   * @param {Event} event - El evento del campo de entrada.
   */
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setCredentials({ ...credentials, password });
    setPasswordMatch(password === repeatPassword);
  };

  /**
   * Maneja el cambio en el campo de repetir contraseña.
   *
   * @param {Event} event - El evento del campo de entrada.
   */
  const handleRepeatPasswordChange = (event) => {
    const repeatPassword = event.target.value;
    setRepeatPassword(repeatPassword);
    setPasswordMatch(credentials.password === repeatPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-green-100 min-h-screen">
      <img src="incajobs_logo.png" className="w-36 mb-6" alt="incajobs Logo" />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-green-800">Crea tu perfil</h1>

        <div className="flex flex-col">
          <div className="flex justify-between mb-4">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                value="alumno"
                checked={role === 'alumno'}
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-lg text-green-700">Alumno</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="empresa"
                checked={role === 'empresa'}
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-lg text-green-700">Empresa</span>
            </label>
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            type="text"
            className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="Tu Nombre"
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="Correo electrónico"
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            className={`p-3 mb-4 border rounded focus:outline-none focus:ring-1 ${passwordMatch ? 'border-green-700 focus:border-green-800 focus:ring-green-600' : 'bg-red-100 border-red-500 focus:border-red-700 focus:ring-red-600'}`}
            placeholder="Contraseña (8 o más caracteres)"
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">Repetir Contraseña</label>
          <input
            onChange={handleRepeatPasswordChange}
            type="password"
            className={`p-3 mb-4 border rounded focus:outline-none focus:ring-1 ${passwordMatch ? 'border-green-700 focus:border-green-800 focus:ring-green-600' : 'bg-red-100 border-red-500 focus:border-red-700 focus:ring-red-600'}`}
            placeholder="Repite la contraseña"
          />

          {role === 'alumno' && (
            <>
              <label className="block mb-2 text-sm font-medium text-gray-700">NIA (Número de Identificación del Alumno)</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, nia: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="NIA (puede ser inventado)"
              />
              <p className="text-xs text-gray-600 mb-4">*Puedes inventarlo por ahora</p>
              <label className="block mb-2 text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, birthDate: event.target.value })
                }
                type="date"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Fecha de Nacimiento"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Nacionalidad</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, nationality: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Nacionalidad"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Género</label>
              <select
                onChange={(event) =>
                  setCredentials({ ...credentials, gender: event.target.value })
                }
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
              >
                <option value="">Selecciona tu género</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="otro">Otro</option>
              </select>
              <label className="block mb-2 text-sm font-medium text-gray-700">Municipio</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, municipality: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Municipio"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, address: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Dirección"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Código Postal</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, postalCode: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Código Postal"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">DNI o Pasaporte</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, identificationNumber: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Número de Identificación (DNI o Pasaporte)"
              />
            </>
          )}

          {role === 'empresa' && (
            <>
              <label className="block mb-2 text-sm font-medium text-gray-700">Nombre de la Empresa</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, nombreEmpresa: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Nombre de la Empresa"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Localidad, Provincia y País</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, companyLocation: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Localidad, Provincia y País"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">CIF</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, companyCIF: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="CIF"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Dirección</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, address: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Dirección"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">Código Postal</label>
              <input
                onChange={(event) =>
                  setCredentials({ ...credentials, postalCode: event.target.value })
                }
                type="text"
                className="p-3 mb-4 border border-green-700 rounded focus:border-green-800 focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Código Postal"
              />
            </>
          )}
        </div>
        <button onClick={register} className="bg-green-800 text-white p-3 rounded mt-4 hover:bg-green-900">
          Unirse
        </button>
      </div>
      <hr className="my-6 w-full max-w-md border-t-2 border-green-700 relative" data-content="o" />
      <div className="flex justify-center">
        <p className="text-green-700">
          ¿Ya tienes cuenta?{" "}
          <span className="font-bold cursor-pointer text-green-900" onClick={() => navigate("/")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
