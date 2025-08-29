import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Navbar.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const roles = user?.user?.roles || [];
  const isAdmin = roles.includes('admin');

  // Cierra el menú al hacer click en un link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 fixed-top custom-navbar">
      <div className="container">

        {/* LOGO INUTRIPS */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={handleLinkClick}>
          <img
            src="/images/LOGO PRINCIPAL.png"
            alt="INUTrips Logo"
            style={{ height: '50px' }}
          />
          <strong className="brand-text">
            <span className="logo-brand">
              <span style={{ color: '#675544', fontWeight: 'bold', fontSize: '1.5rem' }}>INU</span>
              <span className="logo-trips" style={{ fontSize: '1.5rem' }}>Trips</span>
            </span>
          </strong>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navegación */}
        <div className={`collapse navbar-collapse justify-content-end${menuOpen ? ' show' : ''}`} id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">

            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/about" onClick={handleLinkClick}>Quiénes Somos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/report" onClick={handleLinkClick}>Encontré una Mascota</Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-inu rounded-pill px-4" to="/CompraQr" onClick={handleLinkClick}>
                Solicitar Medalla
              </Link>
            </li>

            {/* Si no hay sesión */}
            {!user ? (
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/login" onClick={handleLinkClick}>Iniciar Sesión</Link>
              </li>
            ) : (
              <>
                {/* SOLO PARA USUARIOS COMUNES */}
                {!isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-semibold" to="/mypets" onClick={handleLinkClick}>Mis Mascotas</Link>
                  </li>
                )}

                {/* SOLO PARA ADMIN */}
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-semibold" to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                  </li>
                )}

                {/* Botón cerrar sesión */}
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