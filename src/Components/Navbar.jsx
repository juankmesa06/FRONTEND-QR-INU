import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Navbar.css'; // Asegúrate de que este archivo existe

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-lg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/images/LOGO PRINCIPAL.png" alt="INUTrips Logo" style={{ height: '40px' }} />

          <span className="fw-bold text-white">INU</span>
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar Sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Quiénes Somos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/report">Encontré una Mascota</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-light text-dark fw-semibold ms-3 px-4 rounded-pill" to="/CompraQr">
                Comprar QR
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
