import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/hombres.css";
import { FaShoppingCart } from "react-icons/fa";

function Nlanzamientos() {
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

    // Mostrar alerta utilizando react-toastify
    toast.success("Se agregó al carrito", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Duración del mensaje en milisegundos
    });
  };

  useEffect(() => {
    // Utiliza los resultados de búsqueda si están disponibles
    const productosMostrar = searchResults.length > 0 ? searchResults : data;

    // Filtrar los productos locales solo por los nuevos lanzamientos
    const nuevosLanzamientos = productosMostrar.filter((producto) => {
      const productoDate = new Date(producto.fechaAgregado);
      return (
        productoDate.getUTCFullYear() === new Date().getUTCFullYear() &&
        productoDate.getUTCMonth() === new Date().getUTCMonth() &&
        productoDate.getUTCDate() === new Date().getUTCDate()
      );
    });

    // Ordenar los nuevos lanzamientos por fecha de agregado de manera descendente
    const productosOrdenados = nuevosLanzamientos.sort(
      (a, b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado)
    );

    setProductos(productosOrdenados);
  }, [data, searchResults]);

  return (
    <div className="hombres-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-hombre">
          <img src={producto.imagen} alt={producto.nombreProducto} />
          <div className="producto-info">
            <h3 className="producto-titulo">{producto.nombreProducto}</h3>
            <p className="producto-descripcion">{producto.descripcion}</p>
            <p className="producto-precio">${producto.precio}</p>
            <p className="producto-talla">Talla: {producto.talla}</p>
            <p className="producto-marca">Marca: {producto.marca}</p>
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

export default Nlanzamientos;