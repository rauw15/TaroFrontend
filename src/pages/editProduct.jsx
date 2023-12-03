import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/data.context";
import "../styles/ApartadosAdmin.css";

function EditProduct({ onCancel }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productTalla, setProductTalla] = useState("");
  const [productMarca, setProductMarca] = useState("");
  const [productCategoria, setProductCategoria] = useState("");
  const [productCantidad, setProductCantidad] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [discountActive, setDiscountActive] = useState(false); // Nuevo estado
  const { obtainData } = useContext(DataContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/productos/obtenerProductos"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleProductSelection = (productId) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
    setProductName(product.nombreProducto);
    setProductPrice(product.precio);
    setProductTalla(product.talla);
    setProductMarca(product.marca);
    setProductCategoria(product.categoria);
    setProductCantidad(product.cantidad);
    setProductDescription(product.descripcion);
    // Puedes manejar la imagen de manera diferente según tus necesidades
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        nombreProducto: productName,
        precio: discountActive
          ? (parseFloat(productPrice) * 0.85).toFixed(2)
          : productPrice, // Aplicar descuento del 15%
        talla: productTalla,
        marca: productMarca,
        categoria: productCategoria,
        cantidad: productCantidad,
        descripcion: productDescription,
        // Puedes manejar la imagen de manera diferente según tus necesidades
      };

      // Realiza la lógica para actualizar la imagen, si es necesario

      await axios.put(
        `http:/localhost:3001/productos/actualizar/${selectedProduct._id}`,
        updatedProductData
      );
      obtainData();

      setSelectedProduct(null);
      // Restablecer los estados
      setProductName("");
      setProductPrice("");
      setProductTalla("");
      setProductMarca("");
      setProductCategoria("");
      setProductCantidad("");
      setProductDescription("");
      setProductImage(null);
      setDiscountActive(false); // Desactivar el descuento al actualizar
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    // Restablecer los estados
    setProductName("");
    setProductPrice("");
    setProductTalla("");
    setProductMarca("");
    setProductCategoria("");
    setProductCantidad("");
    setProductDescription("");
    setProductImage(null);
  };

  return (
    <div className="container">
      <h2>Editar Producto</h2>
      {selectedProduct ? (
        <div>
          <ProductForm
            productName={productName}
            productPrice={productPrice}
            productTalla={productTalla}
            productMarca={productMarca}
            productCategoria={productCategoria}
            productCantidad={productCantidad}
            productDescription={productDescription}
            productImage={productImage}
            onProductImageChange={(file) => setProductImage(file)}
            onDiscountToggle={() => setDiscountActive(!discountActive)}
            discountActive={discountActive}
            onUpdateProduct={handleUpdateProduct}
            onCancel={handleCancel}
            handleLogout={handleLogout}
            setProductName={(value) => setProductName(value)}
            setProductPrice={(value) => setProductPrice(value)}
            setProductTalla={(value) => setProductTalla(value)}
            setProductMarca={(value) => setProductMarca(value)}
            setProductCategoria={(value) => setProductCategoria(value)}
            setProductCantidad={(value) => setProductCantidad(value)}
            setProductDescription={(value) => setProductDescription(value)}
          />
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <div className="product-info">
                <span>{product.nombreProducto}</span>
              </div>
              <div className="product-actions">
                <button
                  className="button"
                  onClick={() => handleProductSelection(product._id)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductForm({
  productName,
  productPrice,
  productTalla,
  productMarca,
  productCategoria,
  productCantidad,
  productDescription,
  productImage,
  onProductImageChange,
  onDiscountToggle,
  discountActive,
  onUpdateProduct,
  onCancel,
  handleLogout,
  // Pasa las funciones de actualización de estado
  setProductName,
  setProductPrice,
  setProductTalla,
  setProductMarca,
  setProductCategoria,
  setProductCantidad,
  setProductDescription,
}) {
  return (
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
          onChange={(e) => onProductImageChange(e.target.files[0])}
          accept="image/*"
        />
      </div>
      <button
        onClick={() => onDiscountToggle()}
        className={`button ${discountActive ? "discount-active" : ""}`}
      >
        Aplicar Descuento
      </button>
      <button onClick={() => onUpdateProduct()} className="button">
        Actualizar Producto
      </button>
      <button onClick={() => onCancel()} className="button">
        Cancelar
      </button>
    </div>
  );
}

export default EditProduct;
