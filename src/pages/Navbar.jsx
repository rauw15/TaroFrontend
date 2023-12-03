import React, { useState, useEffect, Fragment, useContext } from "react";
import "../styles/estilosnavbar.css";
import Logo from "../images/logo-TARO.jpg";
import { FaHeart, FaShoppingCart, FaSearch, FaComment } from "react-icons/fa";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/data.context";
import axios from "axios";
import Mensajes from "./Mensajes";
import { useAuth } from "../context/auth.context"; // Asegúrate de importar el contexto adecuado

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const { updateSearchResults } = useContext(DataContext); // Obtén la función desde el contexto
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [mostrarModalMensajes, setMostrarModalMensajes] = useState(false);
  const { user: authUser } = useAuth(); // Obtén la información del usuario desde el contexto de autenticación

  const toggleModalMensajes = () => {
    setMostrarModalMensajes(!mostrarModalMensajes);
  };

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
            nombre: response.data.nombre,
            // ... (otros datos del usuario que desees guardar)
          });
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Realiza la solicitud al backend para buscar productos por nombre
      const response = await axios.get(
        `http://localhost:3001/productos/buscarPorNombre/${searchQuery}`
      );

      // Maneja la respuesta del backend según tus necesidades
      console.log("Resultados de búsqueda:", response.data);

      // Guarda los resultados de la búsqueda en el estado
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error al buscar productos:", error);
      // Puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
    }
  };
  const handleLogout = async () => {
    try {
      // Elimina el token al cerrar sesión
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Fragment>
      <nav>
        <Link to="/#">
          <img src={Logo} alt="Logo" />
        </Link>
        {user ? (
          <div className="user-info">
            <span>{`¡Hola, ${user.nombre}!`}</span>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Iniciar sesión
          </Link>
        )}

        <ul>
          <li>
            <Link to="/Nlanzamientos">Nuevos Lanzamientos</Link>
          </li>
          <li>
            <Link to="/Hombres">Hombres</Link>
          </li>
          <li>
            <Link to="/Mujeres">Mujeres</Link>
          </li>
          <li>
            <Link to="/Rebajas">Rebajas</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-input-container">
            <label className="search-label">
              <FaSearch size={20} color="white" className="search-icon" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </label>
          </div>

          <Link to="/Apartados">
            <button style={{ backgroundColor: "transparent", border: "none" }}>
              <FaShoppingCart size={20} color="white" className="icon" />
            </button>
          </Link>
          <button
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={toggleModalMensajes}
          >
            <FaComment size={20} color="white" className="icon" />
          </button>
        </div>
      </nav>
      {/* Renderiza los resultados de búsqueda en lugar de mostrar todos los productos */}
      <Outlet results={searchResults} />
      <Mensajes
        isOpen={mostrarModalMensajes}
        onRequestClose={toggleModalMensajes}
        user={authUser} // Pasa la información del usuario como prop
      />
    </Fragment>
  );
}

export default Navbar;
