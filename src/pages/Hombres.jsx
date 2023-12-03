import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data.context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/hombres.css";
import { FaShoppingCart } from "react-icons/fa";

function Hombres() {
  const { data, obtainData, addToCart } = useContext(DataContext);
  const [productos, setProductos] = useState([]);

  const addToCartHandler = (producto) => {
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
    // Filtra los productos por categoría 'Hombre'
    const productosHombres = data.filter(
      (producto) => producto.categoria === "Hombre"
    );
    setProductos(productosHombres);
  }, [data]);

  return (
    <div className="hombres-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-hombre">
          <img src={producto.imagen} alt={producto.nombre} />
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

export default Hombres;