import { useEffect, createContext, useContext, useState } from "react";
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/auth/requests";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Nuevo estado para el carrito

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (userData) => {
    const { nombre, apellido, email, password } = userData;

    // Validar que se haya ingresado un nombre, apellido, correo y contraseña
    if (!nombre || !apellido || !email || !password) {
      setErrorMessage("Por favor, ingresa todos los campos.");
      return;
    }

    try {
      const response = await registerRequest(userData);

      if (response.data.token) {
        // Usuario registrado correctamente
        const token = response.data.token;

        // Mostrar el token en la consola
        console.log("Token de sesión:", token);

        // Almacenar el token en el almacenamiento local
        localStorage.setItem("token", token);

        // Actualizar el estado del usuario autenticado
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        // Otros errores
        setErrorMessage("Error al registrar el usuario");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al procesar la solicitud");
    }
  };

  const signin = async (userData) => {
    const { email, password } = userData;

    // Validar que se haya ingresado un correo y una contraseña
    if (!email || !password) {
      setErrorMessage("Por favor, ingresa todos los campos.");
      return;
    }

    try {
      const response = await loginRequest(userData);

      if (response.data.token) {
        const token = response.data.token;
        const isAdmin = response.data.isAdmin; // Nueva propiedad para verificar si es admin

        console.log("Token de sesión:", token);

        localStorage.setItem("token", token);

        // Almacenar el email en el contexto
        setUser({ ...response.data.user, email });
        setIsAuthenticated(true);

        // Redirigir según el tipo de usuario
        if (isAdmin) {
          navigate("/ProductUploader"); // Ruta para administradores
        } else {
          navigate("/#"); // Ruta para usuarios normales
        }
      } else {
        setErrorMessage("Error al registrar el usuario");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al procesar la solicitud");
    }
  };

  const logout = () => {
    // Limpia el carrito al cerrar sesión
    setCart([]);

    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const addToCart = (product) => {
    if (isAuthenticated) {
      setCart((prevCart) => [...prevCart, product]);
    } else {
      setErrorMessage(
        "Debes estar autenticado para agregar productos al carrito."
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
        cart, // Agregar el carrito al contexto
        addToCart, // Agregar la función addToCart al contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
