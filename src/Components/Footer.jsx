import React from 'react';
import '../assets/Footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Footer = () => {
  return (
    <footer className="inu-footer text-center">
      <div className="container d-flex flex-column align-items-center">

        {/* Logo */}
        <img
          src="/images/LOGO PRINCIPAL.png"
          alt="INUTrips"
          className="brand-logo mb-3"
        />

        {/* Nombre y lema */}
        <div className="brand-name">
          <span className="text-brown">INU</span><span className="text-yellow">Trips</span>
        </div>
        <div className="brand-tagline mb-2">
          Juntos a todas partes 🐾
        </div>

        {/* Descripción */}
        <p className="brand-desc mb-4">
          Soluciones de movilidad, seguridad e identidad para tus mascotas.
        </p>

        {/* Redes sociales */}
        <div className="social-icons d-flex gap-4 justify-content-center mb-4">
          <a href="https://facebook.com/inutrips" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://instagram.com/inutrips" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://tiktok.com/@inu.trips" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-tiktok"></i>
          </a>
          <a href="https://twitter.com/inutrips" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="https://youtube.com/inutrips" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-youtube"></i>
          </a>
        </div>

        

        {/* Derechos reservados */}
        <div className="footer-bottom mt-3">
          &copy; {new Date().getFullYear()} <span className="text-yellow">ARIME</span>SOFTWARE – Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
