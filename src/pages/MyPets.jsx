import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/MyPets.css';

function MyPets() {
  const navigate = useNavigate();

  // Simulando verificación de sesión iniciada
  const usuario = localStorage.getItem('usuario');

  useEffect(() => {
    if (!usuario) {
      navigate('/login'); // Redirige si no está logueado
    }
  }, [usuario, navigate]);

  const mascotas = [
    { nombre: 'Fido', especie: 'Perro', edad: 3 },
    { nombre: 'Mimi', especie: 'Gato', edad: 2 },
  ];

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">🐾 Mis Mascotas</h2>
      <div className="row">
        {mascotas.map((m, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card shadow-sm border-0 pet-card-custom">
              <div className="card-body text-center">
                <h5 className="card-title">{m.nombre}</h5>
                <p className="card-text">
                  <strong>Especie:</strong> {m.especie}<br />
                  <strong>Edad:</strong> {m.edad} años
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
