import Catalog from '../pages/Catalogo'
import Banner from '../pages/Banner'
import { Fragment } from 'react'
import React, { useState } from 'react';
import Apartados from '../pages/Apartados';

export default function Inicio() {

  const [carrito, setCarrito] = useState([]);

  const addToCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <Fragment>
        <Banner />
        <Catalog addToCarrito={addToCarrito} />
    </Fragment>


  )
}
