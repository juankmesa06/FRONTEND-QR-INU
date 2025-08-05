// src/pages/PetInfo.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PetInfo() {
  // Obtiene el código QR de la URL
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { qrCode } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`${apiUrl}/pets/code/${qrCode}`);
        if (!res.ok) throw new Error('Mascota no encontrada');
        const data = await res.json();
        setPet(data);
      } catch (err) {
        console.error('Error al cargar la mascota:', err);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [qrCode]);

  if (loading) return <p className="text-center mt-5">Cargando información de la mascota...</p>;
  if (!pet) return <p className="text-center text-danger mt-5">Mascota no encontrada</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mascota Encontrada</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
        {pet.image && (
          <img
            src={`${apiUrl}/files/pet/${pet.image}`}
            alt="Foto mascota"
            className="img-fluid rounded mb-3"
          />
        )}
        <p><strong>Nombre:</strong> {pet.name}</p>
        <p><strong>Edad:</strong> {pet.age} años</p>
        <p><strong>Especie:</strong> {pet.species}</p>
        <p><strong>Raza:</strong> {pet.breed}</p>
        <p><strong>Género:</strong> {pet.gender}</p>
        <p><strong>Tamaño:</strong> {pet.size}</p>
        <hr />
        <p><strong>Dueño:</strong> {pet.owner?.name} {pet.owner?.last_name}</p>
        <p><strong>Correo:</strong> {pet.owner?.email}</p>
        <p><strong>Teléfono:</strong> {pet.owner?.phone}</p>
      </div>
    </div>
  );
}

export default PetInfo;
