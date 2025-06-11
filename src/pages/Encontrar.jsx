// src/pages/Encontrar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Encontrar() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    navigate('/mascota/12345'); // Redirigir a /petinfo
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Encuentra tu mascota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Código QR"
        />
        <button type="submit" className="btn btn-success w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Encontrar;
