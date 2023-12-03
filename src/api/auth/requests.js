import axios from "axios";

const API = "http://localhost:3001";

export const registerRequest = (user) =>
  axios.post(`${API}/usuarios/crear`, user);

export const loginRequest = (user) =>
  axios.post(`${API}/usuarios/obtener`, user);

export const verifyTokenRequest = (user) =>
  axios.post(`${API}/usuarios/crear`, user);

export const obtainProducts = (data) =>
  axios.get(`${API}/productos/ObtenerProductos`, data);

export const sendProducts = (data) =>
  axios.post(`${API}/productos/crear`, data);

// Frontend: Modifica la función createSaleRequest
export const createSaleRequest = async (userEmail, cart) => {
  try {
    const response = await axios.post(`${API}/ventas/crear`, {
      userEmail: userEmail,
      detallesVenta: cart.map((item) => ({
        nombreProducto: item.nombreProducto,
        cantidad: item.cantidad,
      })),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Agregar producto al carrito
export const addToCartRequest = async (productId) => {
  try {
    const response = await axios.post(
      `${API}/usuarios/agregar-al-carrito/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw error;
  }
};

// Obtener productos del carrito
export const getCartProductsRequest = async () => {
  try {
    const response = await axios.get(`${API}/usuarios/obtener-carrito`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos del carrito:", error);
    throw error;
  }
};
