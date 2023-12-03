import React, { useState, useEffect } from "react";
import "../styles/HistorialCompras.css";

function HistorialCompras() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/ventas/obtenertodas"
        );

        if (response.ok) {
          const data = await response.json();
          // Asegurarse de que data.ventas sea un array antes de usarlo
          if (Array.isArray(data.ventas)) {
            setOrders(data.ventas);
          } else {
            console.error("La respuesta del servidor no es un array:", data);
          }
        } else {
          console.error("Error al obtener las ventas");
        }
      } catch (error) {
        console.error("Error al obtener las ventas", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/ventas/borrar/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } else {
        console.error("Error al eliminar la venta");
      }
    } catch (error) {
      console.error("Error al eliminar la venta", error);
    }
  };

  return (
    <div className="order-history">
      <h2>Historial de Compras</h2>
      <table>
        <thead>
          <tr>
            <th>Orden ID</th>
            <th>Usuario</th>
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.Usuario.email}</td>
                <td>
                  <ul>
                    {Array.isArray(order.Productos) &&
                      order.Productos.map((product, index) => (
                        <li key={index}>
                          {product.nombreProducto} - ${product.precio}{" "}
                          (Cantidad: {product.cantidad})
                        </li>
                      ))}
                  </ul>
                </td>

                <td>
                  <button onClick={() => handleDeleteOrder(order._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistorialCompras;
