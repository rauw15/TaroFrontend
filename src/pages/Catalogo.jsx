import React, { useContext, useEffect, useState } from "react";
import "../styles/catalog.css";
import { DataContext } from "../context/data.context";
import { FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Catalog() {
  const { data, searchResults, addToCart } = useContext(DataContext);
  const [productos, setProductos] = useState([]);

  const addToCartHandler = (producto) => {
    // Lógica para agregar el producto al carrito usando la función addToCart
    addToCart({
      id: producto.id,
      nombreProducto: producto.nombreProducto,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      precio: producto.precio,
    });

    toast.success("Se agregó al carrito", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Duración del mensaje en milisegundos
    });
  };

  useEffect(() => {
    const productosMostrar = searchResults.length > 0 ? searchResults : data;

    const nuevosLanzamientos = productosMostrar.filter((producto) => {
      const productoDate = new Date(producto.fechaAgregado);
      return (
        productoDate.getUTCFullYear() === new Date().getUTCFullYear() &&
        productoDate.getUTCMonth() === new Date().getUTCMonth() &&
        productoDate.getUTCDate() === new Date().getUTCDate()
      );
    });

    const productosOrdenados = nuevosLanzamientos.sort(
      (a, b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado)
    );

    setProductos(productosOrdenados);
  }, [data, searchResults]);

  return (
    <div className="catalog-container">
      {productos.map((producto) => (
        <div key={producto.id} className="product">
          <img src={producto.imagen} alt={producto.nombreProducto} />
          <div className="product-info">
            <h3 className="product-title">{producto.nombreProducto}</h3>
            <p className="product-description">{producto.descripcion}</p>
            <p className="product-price">${producto.precio}</p>
            <p className="product-talla">Talla: {producto.talla}</p>
            <p className="product-marca">Marca: {producto.marca}</p>
            <button
              className="cart-button"
              onClick={() => addToCartHandler(producto)}
            >
              <FaShoppingCart /> Agregar al carrito
            </button>
          </div>
        </div>
      ))}
       <ToastContainer />
    </div>
  );
}

export default Catalog;