import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Modal from "react-modal";
import axios from "axios";
import "../styles/Mensajes.css";
import { useAuth } from "../context/auth.context";

const socket = io("http://localhost:3001");

const Mensajes = ({ isOpen, onRequestClose }) => {
  const { user, setUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const receiveMessage = (newMessage) => {
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

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
  }, [setUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: user ? user.nombre : "Me",
    };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Mensajes"
      className="modal-mensajes"
      overlayClassName="modal-overlay"
    >
      <div className="mensajes-container">
        <h2>Atención a clientes</h2>
        <div className="mensajes-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.from === "Me" ? "mensaje-item-yo" : "mensaje-item-otro"
              }
            >
              {msg.from !== "Me" && <strong>{msg.from}:</strong>} {msg.body}
            </div>
          ))}
        </div>
        <div className="mensaje-input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </Modal>
  );
};

export default Mensajes;
