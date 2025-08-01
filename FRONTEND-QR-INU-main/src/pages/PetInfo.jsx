// src/pages/PetInfo.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function PetInfo() {
  const { qrCode } = useParams(); // Asumiendo que usas rutas como /mascota/:qrCode

  // Aquí iría un fetch real a la API según el código QR
  const petData = {
    nombreMascota: "Firulais",
    nombreDueno: "Juan Pérez",
    email: "juan@example.com",
    telefono: "3001234567"
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mascota Encontrada</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <p><strong>Nombre de la Mascota:</strong> {petData.nombreMascota}</p>
        <p><strong>Nombre del Dueño:</strong> {petData.nombreDueno}</p>
        <p><strong>Correo:</strong> {petData.email}</p>
        <p><strong>Teléfono:</strong> {petData.telefono}</p>
      </div>
    </div>
  );
}

export default PetInfo;
