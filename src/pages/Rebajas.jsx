import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/data.context";
import "../styles/rebajas.css";
import { FaShoppingCart } from "react-icons/fa";

function Rebajas( ) {
  const [productosEditados, setProductosEditados] = useState([]);
  const precioDeseado = 100;

  const { data, obtainData, addToCart } = useContext(DataContext);

  const addToCartHandler = (producto) => {
    // Lógica para agregar el producto al carrito usando la función addToCart
    addToCart({
      id: producto.id,
      nombreProducto: producto.nombreProducto,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });
  };

  useEffect(() => {
    const obtenerProductosEditados = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/productos/obtenerProductosEditados/${precioDeseado}`
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setProductosEditados(data);
          } else {
            console.error("La respuesta del servidor no es un array:", data);
          }
        } else {
          console.error("Error en la respuesta del servidor:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener productos editados:", error);
      }
    };

    obtenerProductosEditados();
  }, [data, precioDeseado]);

  return (
    <div className="catalog-container">
      {productosEditados.map((producto) => (
        <div key={producto.id} className="product">
          <img src={producto.imagen} alt={producto.nombreProducto} />
          <div className="product-info">
            <h3 className="product-title">{producto.nombreProducto}</h3>
            <p className="product-description">{producto.descripcion}</p>
            <p className="product-price">${producto.precio}</p>
            <button
              className="cart-button"
              onClick={() => addToCartHandler(producto)}
            >
              <FaShoppingCart /> Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rebajas;