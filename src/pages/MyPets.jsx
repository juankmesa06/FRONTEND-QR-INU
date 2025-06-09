// src/pages/MyPets.jsx
import React from 'react';

function MyPets() {
  // Aquí podrías traer los datos del usuario logueado y sus mascotas
  const mascotas = [
    { nombre: 'Fido', especie: 'Perro', edad: 3 },
    { nombre: 'Mimi', especie: 'Gato', edad: 2 }
  ];

  return (
    <div>
      <h2 className="text-center mb-4">Mis Mascotas</h2>
      <ul className="list-group">
        {mascotas.map((m, index) => (
          <li key={index} className="list-group-item">
            <strong>{m.nombre}</strong> - {m.especie}, {m.edad} años
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyPets;
