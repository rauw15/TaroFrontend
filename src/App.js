import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mensajes from "./pages/Mensajes";
import Modal from "react-modal"; // Importa el componente Modal desde react-modal
import Navbar from "./pages/Navbar";
import Inicio from "./pages/Inicio";
import Login from "./pages/login";
import Apartados from "./pages/Apartados";
import Hombres from "./pages/Hombres";
import Mujeres from "./pages/Mujeres";
import Rebajas from "./pages/Rebajas";
import AdminViews from "./pages/AdminView";
import Nlanzamientos from "./pages/Nlanzamientos";
import ApartadosAdmin from "./pages/ApartadosAdmin";
import ProductUploader from "./pages/ProductUploader";
import HistorialCompras from "./pages/HistorialCompras";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth.context";
import { ProtectedRoute } from "./ProtectedRoutes";
import DataProvider from "./context/data.context";
import EditProduct from "./pages/editProduct";
import AdminNavbar from "./pages/adminNavbar";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

Modal.setAppElement("#root"); // Necesario para que react-modal funcione correctamente

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarMensajes, setMostrarMensajes] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const toggleMensajes = () => {
    setMostrarMensajes(!mostrarMensajes);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Navbar carrito={carrito} />}>
              <Route index element={<Inicio />} />
              <Route
                path="/Apartados"
                element={<Apartados carrito={carrito} />}
              />
              <Route
                path="/Hombres"
                element={<Hombres agregarAlCarrito={agregarAlCarrito} />}
              />
              <Route
                path="/Mujeres"
                element={<Mujeres agregarAlCarrito={agregarAlCarrito} />}
              />
              <Route
                path="/Rebajas"
                element={<Rebajas agregarAlCarrito={agregarAlCarrito} />}
              />
              <Route
                path="/Nlanzamientos"
                element={<Nlanzamientos agregarAlCarrito={agregarAlCarrito} />}
              />
            </Route>

            <Route path="/Register" element={<Register />} />

            <Route path="/Login" element={<Login />} />

            <Route
              path="/ApartadosAdmin"
              element={
                <>
                  <AdminNavbar toggleModalMensajes={toggleMensajes} />
                  <ApartadosAdmin />
                </>
              }
            />
            <Route
              path="/ProductUploader"
              element={
                <>
                  <AdminNavbar toggleModalMensajes={toggleMensajes} />
                  <ProductUploader />
                </>
              }
            />
            <Route
              path="/HistorialCompras"
              element={
                <>
                  <AdminNavbar toggleModalMensajes={toggleMensajes} />
                  <HistorialCompras />
                </>
              }
            />
            <Route
              path="/EditProduct"
              element={
                <>
                  <AdminNavbar toggleModalMensajes={toggleMensajes} />
                  <EditProduct />
                </>
              }
            />
          </Routes>
        </DataProvider>
      </AuthProvider>

      {/* Modal de Mensajes */}
      <Modal
        isOpen={mostrarMensajes}
        onRequestClose={toggleMensajes}
        contentLabel="Mensajes"
      >
        <Mensajes />
      </Modal>
    </BrowserRouter>
  );
}

export default App;
