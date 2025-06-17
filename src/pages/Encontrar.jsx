// src/pages/Encontrar.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Encontrar() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    navigate('/mascota/12345'); // Redirigir a la info de la mascota
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h2 className="text-center mb-4">Encuentra tu mascota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Código QR"
        />
        <button type="submit" className="btn btn-success w-100 mb-3">
          Ingresar
        </button>
        <Link className="btn btn-link w-100 text-center" to="/mypets">
          Mis Mascotas
        </Link>
      </form>
    </div>
  );
}

export default Encontrar;


