import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import LogoLogin from "../images/logo-TARO.jpg";
import { useAuth } from "../context/auth.context";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      nombre,
      apellido,
      email,
      password,
    };

    try {
      await signup(userData);
    } catch (error) {
      setError("Error al registrarse");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={LogoLogin} alt="Logo" className="larger-logo" />
      </div>
      <div className="form-container">
        <h2>Ingresa tus datos para registrarte en TaroBoutique</h2>
        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
