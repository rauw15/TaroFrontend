import React, { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import Mensajes from "./Mensajes";
import { useAuth } from "../context/auth.context"; // Asegúrate de importar el contexto adecuado

const AdminNavbar = ({ toggleModalMensajes }) => {
  const [mostrarModalMensajes, setMostrarModalMensajes] = useState(false);
  const { user } = useAuth(); // Obtén la información del usuario desde el contexto

  const toggleMensajes = () => {
    setMostrarModalMensajes(!mostrarModalMensajes);
  };

  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <a href="/ApartadosAdmin">Eliminar</a>
        </li>
        <li>
          <a href="/EditProduct">Editar Productos</a>
        </li>
        <li>
          <a href="/HistorialCompras">Ventas</a>
        </li>
        <li>
          <a href="/ProductUploader">Subir productos</a>
        </li>
      </ul>
      <li>
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={toggleMensajes}
        >
          <FaComment size={20} color="white" className="icon" />
        </button>
      </li>
      {/* Render the Mensajes component conditionally based on the state */}
      {mostrarModalMensajes && (
        <Mensajes
          isOpen={mostrarModalMensajes}
          onRequestClose={toggleMensajes}
          user={user} // Pasa la información del usuario como prop
        />
      )}
    </nav>
  );
};

export default AdminNavbar;
