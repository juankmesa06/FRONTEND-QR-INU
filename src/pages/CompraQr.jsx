// src/pages/CompraQR.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/CompraQR.css';

function CompraQR() {
  const [nombreMascota, setNombreMascota] = useState('');
  const [especie, setEspecie] = useState('');
  const [tamano, setTamano] = useState('');
  const [dueño, setDueño] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombreMascota,
      especie,
      tamano,
      dueño,
      email,
    };

    const encodedData = encodeURIComponent(JSON.stringify(data));
    navigate(`/qr-generado?data=${encodedData}`);
  };

  return (
    <div className="qr-container">
      <form className="qr-form" onSubmit={handleSubmit}>
        <h2>Comprar QR para Mascota</h2>

        <label>Nombre de la Mascota:</label>
        <input type="text" value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)} required />

        <label>Especie:</label>
        <input type="text" value={especie} onChange={(e) => setEspecie(e.target.value)} required />

        <label>Tamaño:</label>
        <select value={tamano} onChange={(e) => setTamano(e.target.value)} required>
          <option value="">Selecciona una opción</option>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>

        <label>Nombre del Dueño:</label>
        <input type="text" value={dueño} onChange={(e) => setDueño(e.target.value)} required />

        <label>Email de contacto:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit">Comprar QR</button>
      </form>
    </div>
  );
}

export default CompraQR;
