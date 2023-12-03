import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data.context";
import "../styles/mujeres.css";
import { FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mujeres({ id, nombreProducto, imagen, descripcion, precio }) {
  const { data, obtainData, addToCart } = useContext(DataContext);
  const [productos, setProductos] = useState([]);

  const addToCartHandler = () => {
    // Lógica para agregar el producto al carrito usando la función addToCart
    addToCart({
      id,
      nombreProducto,
      imagen,
      descripcion,
      precio,
    });

    toast.success("Se agregó al carrito", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Duración del mensaje en milisegundos
    });
  };

  useEffect(() => {
    obtainData(); // Asegúrate de obtener los datos al montar el componente
  }, [obtainData]);

  useEffect(() => {
    // Filtra los productos por categoría 'Hombre'
    const productosHombres = data.filter(
      (producto) => producto.categoria === "Mujer"
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

            {/* Agrega los campos adicionales que quieras mostrar */}
            <p className="producto-descripcion">{producto.descripcion}</p>
            <p className="producto-precio">${producto.precio}</p>
            <p className="producto-talla">Talla: {producto.talla}</p>
            <p className="producto-marca">Marca: {producto.marca}</p>
            {/* Asegúrate de mostrar todos los campos necesarios */}
            <button className="cart-button" onClick={addToCartHandler}>
              <FaShoppingCart /> Agregar al carrito
            </button>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Mujeres;