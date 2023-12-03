import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import LogoLogin from "../images/logo-TARO.jpg";
import { useAuth } from "../context/auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, signin } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    console.log(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      await signin(userData);
    } catch (error) {
      setErrorMessage("Error al registrarse");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={LogoLogin} alt="Logo" className="larger-logo" />
      </div>
      <div className="form-container">
        <h2>Ingresa tus datos para unirte o iniciar sesión.</h2>
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit">Iniciar Sesión</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="register-link">
          <p>¿No tienes una cuenta? <Link to="/Register"><button>Regístrate aquí</button></Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Login;