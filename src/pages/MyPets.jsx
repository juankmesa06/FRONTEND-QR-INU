import React from 'react';
import '../assets/MyPets.css'; // Asegúrate de tener este archivo

function MyPets() {
  const mascotas = [
    { nombre: 'Fido', especie: 'Perro', edad: 3 },
    { nombre: 'Mimi', especie: 'Gato', edad: 2 }
  ];

  return (
    <div className="pets-container">
      <h2 className="pets-title">🐶 Mis Mascotas 🐱</h2>
      <div className="pets-list">
        {mascotas.map((m, index) => (
          <div key={index} className="pet-card">
            <h4 className="pet-name">{m.nombre}</h4>
            <p className="pet-info">{m.especie} • {m.edad} años</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
