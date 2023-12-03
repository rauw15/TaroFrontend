import React, { useState } from "react";
import "../styles/AdminView.css";
import axios from "axios";

function AdminView() {
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [storeStatus, setStoreStatus] = useState("Abierto");
  const [newLogo, setNewLogo] = useState(null);

  const handleStoreStatus = (status) => {
    setStoreStatus(status);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setNewLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Nuevo logo subido:", newLogo);
      console.log("Estado de la tienda:", storeStatus);
    } catch (error) {
      console.error(
        "Error al subir el logo o cambiar el estado de la tienda:",
        error
      );
    }
  };

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <ul>
          <li>
            <a href="/ApartadosAdmin">Apartados</a>
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
      </nav>
      <div className="admin-content">
        <div className="admin-info">
          <h2>Información del Administrador</h2>
          <p>Correo del Administrador: {adminEmail}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminView;
