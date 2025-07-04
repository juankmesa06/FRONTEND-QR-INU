import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Navbar.css';
import { AuthContext } from '../context/AuthContext'; // Asegúrate que este archivo existe

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 fixed-top custom-navbar">
      <div className="container">
        {/* LOGO INUTRIPS */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="/images/LOGO PRINCIPAL.png"
            alt="INUTrips Logo"
            style={{ height: '50px' }}
          />
          <strong className="brand-text">
            <span style={{ color: '#675544' }}>INU</span>
            <span style={{ color: '#fff', marginLeft: '3px' }}>Trips</span>
          </strong>
        </Link>

        {/* Botón responsive */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navegación */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">

            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/about">Quiénes Somos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/report">Encontré una Mascota</Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-inu rounded-pill px-4" to="/CompraQr">
                Comprar QR
              </Link>
            </li>

            {!user ? (
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/login">Iniciar Sesión</Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-semibold" to="/mypets">Mis Mascotas</Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-dark rounded-pill px-3"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
