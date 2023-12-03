import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/data.context";
import { useNavigate } from "react-router-dom";
import "../styles/ApartadosAdmin.css";

function ApartadosAdmin({ onCancel }) {
  const [products, setProducts] = useState([]);
  const { obtainData } = useContext(DataContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/productos/obtenerProductos"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  const handleDeleteProduct = async (productId) => {
    try {
      const productToDelete = products.find((p) => p._id === productId);

      await axios.put(
        `http://localhost:3001/productos/inventario/${productId}`,
        { cantidad: -1 }
      );

      if (productToDelete.cantidad - 1 === 0) {
        await axios.delete(
          `http://localhost:3001/productos/eliminar/${productId}`
        );
      }

      obtainData();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="container">
      <h2>Eliminar Producto</h2>
      <div>
        {products.map((product) => (
          <div className="product-item" key={product._id}>
            <div className="product-info">
              <span>{product.nombreProducto}</span>
              <span>Cantidad: {product.cantidad}</span>
            </div>
            <div className="product-actions">
              <button
                className="button"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApartadosAdmin;
