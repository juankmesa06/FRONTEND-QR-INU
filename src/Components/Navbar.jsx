import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Navbar.css'; // Asegúrate de tener este archivo

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">
          INUTrips 🐾
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-end">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">Quiénes Somos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/report">Encontré una Mascota</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/mypets">Mis Mascotas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-light text-primary ms-3" to="/CompraQr">Comprar QR</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
