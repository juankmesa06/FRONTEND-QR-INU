// src/Components/Footer.jsx
import React from 'react';
import '../assets/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-inu">
      <div className="container text-center">
        <h5 className="fw-bold text-uppercase">INUPET by INUTrips 🐾</h5>
        <p className="mb-3">Identificación inteligente para tus mascotas. Fácil, rápido y seguro.</p>

        <div className="social-icons d-flex justify-content-center gap-4 mb-3">
          <a href="https://facebook.com/inutrips" target="_blank" rel="noopener noreferrer" className="icon facebook"><i className="bi bi-facebook"></i></a>
          <a href="https://instagram.com/inutrips" target="_blank" rel="noopener noreferrer" className="icon instagram"><i className="bi bi-instagram"></i></a>
          <a href="https://tiktok.com/@inutrips" target="_blank" rel="noopener noreferrer" className="icon tiktok"><i className="bi bi-tiktok"></i></a>
          <a href="https://twitter.com/inutrips" target="_blank" rel="noopener noreferrer" className="icon twitter"><i className="bi bi-twitter-x"></i></a>
          <a href="https://youtube.com/inutrips" target="_blank" rel="noopener noreferrer" className="icon youtube"><i className="bi bi-youtube"></i></a>
        </div>

        <div className="footer-links small d-flex justify-content-center gap-3 flex-wrap">
          <a href="#" className="text-white-50">Compañía</a>
          <a href="#" className="text-white-50">Soporte</a>
          <a href="#" className="text-white-50">Términos y Condiciones</a>
          <a href="#" className="text-white-50">Privacidad</a>
        </div>

        <p className="mt-3 small text-white-50">&copy; {new Date().getFullYear()} InuTrips - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
