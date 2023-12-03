import React, { useState, useContext } from "react";
import "../styles/ProductUploader.css";
import axios from "axios";
import { DataContext } from "../context/data.context";
import { FaHeart, FaShoppingCart, FaSearch, FaComment } from "react-icons/fa";
import Mensajes from "./Mensajes";

function ProductUploader({ onUpload }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productMarca, setProductMarca] = useState("");
  const [productTalla, setProductTalla] = useState("");
  const [productCategoria, setProductCategoria] = useState("");
  const [productCantidad, setProductCantidad] = useState("");
  const [productImage, setProductImage] = useState(null);
  const { sendData, obtainData } = useContext(DataContext);
  const [mostrarModalMensajes, setMostrarModalMensajes] = useState(false);

  const toggleModalMensajes = () => {
    setMostrarModalMensajes(!mostrarModalMensajes);
  };

  const handleUpload = async () => {
    try {
      if (!productName || !productPrice || !productImage) {
        alert("Completa todos los campos obligatorios");
        return;
      }

      const formData = new FormData();
      formData.append("nombreProducto", productName);
      formData.append("precio", productPrice);
      formData.append("descripcion", productDescription);
      formData.append("talla", productTalla);
      formData.append("marca", productMarca);
      formData.append("categoria", productCategoria);
      formData.append("cantidad", productCantidad);
      formData.append("imagen", productImage);

      const response = await axios.post(
        "http://localhost:3001/productos/crear",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpload(response.data.producto);

      // Refresh data after sending a new product
      obtainData();

      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductMarca("");
      setProductTalla("");
      setProductCategoria("");
      setProductCantidad("");
      setProductImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-uploader">
      <h2>Subir Nuevo Producto</h2>
      <div className="form-container">
        <div className="input-group">
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Precio:</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Talla:</label>
          <input
            type="text"
            value={productTalla}
            onChange={(e) => setProductTalla(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Marca:</label>
          <input
            type="text"
            value={productMarca}
            onChange={(e) => setProductMarca(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Categoria:</label>
          <input
            type="text"
            value={productCategoria}
            onChange={(e) => setProductCategoria(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Cantidad:</label>
          <input
            type="text"
            value={productCantidad}
            onChange={(e) => setProductCantidad(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Descripción:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label>Imagen del Producto:</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button onClick={handleUpload}>Subir Producto</button>
      </div>
      <Mensajes
        isOpen={mostrarModalMensajes}
        onRequestClose={toggleModalMensajes}
      />
    </div>
  );
}

export default ProductUploader;
