import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { DataContext } from "../context/data.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/carrito.css";

function Apartados() {
  const { cart, makePurchase, sales, user, setUser, purchaseSuccess, setCart} =
    useContext(DataContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(
            "http://localhost:3001/usuarios/usuario-activo",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser({
            email: response.data.email,
          });

          console.log("Usuario actual:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUser();
  }, [setUser]);

  const totalAmount = cart.reduce(
    (total, producto) => total + producto.precio,
    0
  );

  const handlePurchase = async () => {
    try {
      // Verificar que el correo electrónico esté disponible
      if (!user || !user.email) {
        console.error("Correo electrónico del usuario no disponible.");
        return;
      }

      // Obtener la cantidad de productos comprados en lugar de la cantidad en el inventario
      const purchasedProducts = cart.map((producto) => ({
        nombreProducto: producto.nombreProducto,
        cantidad: 1,
        totalAmount,
      }));

      // Utilizar la función makePurchase del contexto DataContext
      await makePurchase(user.email, purchasedProducts, totalAmount);

      // Mostrar mensaje de pedido realizado
      alert("Pedido realizado con éxito");

      // Limpiar el carrito después de la compra
      setCart([]);
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <div className="carrito">
      <h2>Carrito de compras</h2>
      {cart && cart.length > 0 ? (
        <ul>
          {cart.map((producto) => (
            <li key={producto.id}>
              {producto.nombreProducto} - ${producto.precio}
            </li>
          ))}
        </ul>
      ) : (
        <p>El carrito está vacío.</p>
      )}
      <p>Total: ${totalAmount}</p>
      <button
        onClick={handlePurchase}
        disabled={cart.length === 0 || purchaseSuccess}
      >
        {purchaseSuccess ? "Compra realizada" : "Hacer compra"}
      </button>

      <ToastContainer />

      {sales.length > 0 && (
        <div>
          <h3>Ventas realizadas:</h3>
          <ul>
            {sales.map((venta) => (
              <li key={venta.id}>
                {venta.nombreProducto} - Cantidad: {venta.cantidad}
              </li>
            ))}
          </ul>
        </div>
      )}

      {user && (
        <div>
          <h3>Información del usuario:</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Apartados;