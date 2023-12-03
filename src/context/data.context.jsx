import React, { useState, useEffect, createContext } from "react";
import {
  obtainProducts,
  sendProducts,
  createSaleRequest,
} from "../api/auth/requests";
import { useAuth } from "./auth.context";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Accede al contexto de autenticación
  const { isAuthenticated, userEmail, signup, login, logout } = useAuth(); // Cambiado de userId a userEmail

  const obtainData = async () => {
    try {
      const response = await obtainProducts();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToAPI = async (productData) => {
    try {
      await sendProducts(productData);
      obtainData(); // Refresh data after sending a new product
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtainData();
  }, []);

  // Nueva función para agregar productos al carrito y realizar una venta
  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      setCart((prevCart) => [...prevCart, { ...product, userEmail }]);
    } else {
      setErrorMessage(
        "Debes estar autenticado para agregar productos al carrito."
      );
    }
  };

  // Nueva función para eliminar productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const makePurchase = async (userEmail, cartData) => {
    try {
      // Verificar la autenticación del usuario
      if (!isAuthenticated || cart.length === 0) {
        console.log(
          "Debes iniciar sesión y tener productos en el carrito para hacer una compra"
        );
        return;
      }

      // Utilizar la función makePurchaseRequest del contexto DataContext
      await makePurchaseRequest(userEmail, cartData);
      setPurchaseSuccess(true);
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  const makePurchaseRequest = async (userEmail, cartData) => {
    try {
      // Enviar los datos al backend para realizar la compra
      const response = await createSaleRequest(userEmail, cartData); // Acceder al email directamente
      console.log(response); // Puedes manejar la respuesta según tus necesidades

      // Verificar si la compra fue exitosa antes de actualizar el estado
      if (response && response.message === "Venta realizada con éxito") {
        // Actualizar las ventas realizadas
        setSales((prevSales) => [...prevSales, response.venta]);

        // Limpiar el carrito después de la compra
        setCart([]);
        setPurchaseSuccess(true);
      } else {
        // Manejar el caso en el que la compra no fue exitosa
        console.error("Error al realizar la compra:", response.message);
        // Puedes mostrar un mensaje al usuario indicando el error
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

    // Nueva función para actualizar los resultados de búsqueda
    const updateSearchResults = (results) => {
      setSearchResults(results);
    };

  return (
    <DataContext.Provider
      value={{
        cart,
        setCart,
        sales,
        setSales,
        user,
        setUser,
        isAuthenticated,
        data,
        sendData: sendDataToAPI,
        obtainData,
        addToCart: handleAddToCart,
        removeFromCart,
        makePurchase,
        signup,
        login,
        logout,
        searchResults, // Agregado para proporcionar los resultados de búsqueda
        updateSearchResults, // Función para actualizar los resultados de búsqueda
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
