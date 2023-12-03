import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { DataContext } from "../context/data.context";

function Product({ id, nombreProducto, imagen, descripcion, precio }) {
  const { addToCart } = useContext(DataContext);

  const addToCartHandler = () => {
    // Lógica para agregar el producto al carrito usando la función addToCart
    const newCartItem = {
      id,
      nombreProducto,
      imagen,
      descripcion,
      precio,
    };

    addToCart(newCartItem);
  };

  return (
    <div className="product">
      <img src={imagen} alt={nombreProducto} />
      <div className="product-info">
        <h3>{nombreProducto}</h3>
        <p>{descripcion}</p>
        <div className="product-icons">
          <span className="product-price">${precio}</span>
          <button className="cart-button" onClick={addToCartHandler}>
            <FaShoppingCart /> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
