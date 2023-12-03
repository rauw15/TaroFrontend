import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/banner.css';
import Banner1 from '../images/imagenSlider1.jpg';
import Banner2 from '../images/banner2.jpg';
import Banner3 from '../images/banner3.jpg';
import { Outlet, Link, useNavigate } from "react-router-dom";

function Banner() {
  return (
<div className="banner">
  <div className="carousel-container">
    <Carousel
      autoPlay={true}
      interval={5000}
      infiniteLoop={true}
      showThumbs={false}
    >
        <div>
          <div className="image-container">
            <img src={Banner1} alt="Banner de promoción" />
          </div>
        </div>
        <div>
          <div className="image-container">
            <img src={Banner2} alt="Banner de promoción" />
          </div>
        </div>    
        <div>
          <div className="image-container">
            <img src={Banner3} alt="Banner de promoción" />
          </div>
        </div>
      </Carousel>
</div> 
      <div className="banner-text">
        <h1>¡Bienvenido a Nuestra Tienda!</h1>
        <p>Descubre nuestras ofertas exclusivas.</p>
        <Link to="/Rebajas">
        <button>Ver ofertas</button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
