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
    <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
        {pet.pet.image && (
          <img
            src={pet.pet.image}
            alt="Foto mascota"
            className="img-fluid rounded mb-3"
          />
        )}
        <p><strong>Nombre:</strong> {pet.pet.name}</p>
        <p><strong>Edad:</strong> {pet.pet.age} años</p>
        <p><strong>Especie:</strong> {pet.pet.species}</p>
        <p><strong>Raza:</strong> {pet.pet.breed}</p>
        <p><strong>Género:</strong> {pet.pet.gender}</p>
        <p><strong>Tamaño:</strong> {pet.pet.size}</p>
        <hr />
        <p><strong>Dueño:</strong> {pet.owner?.name} {pet.owner?.last_name}</p>
        <p><strong>Teléfono:</strong> {pet.owner?.phone}</p>
        <div className="d-flex gap-3 mt-3 justify-content-center">
          <a
            href={`https://wa.me/57${pet.owner?.phone}?text=Hola, encontramos tu mascota ${pet.pet.name} usando el QR de INUTrips.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success"
          >
            Contactar <strong>{pet.owner?.name} {pet.owner?.last_name}</strong>
          </a>
          <button
            className="btn btn-outline-success"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  const lat = position.coords.latitude;
                  const lng = position.coords.longitude;
                  const mensaje = `Hola, encontramos una mascota de nombre ${pet.pet.name} usando el QR de INUTrips. Estamos en la siguiente ubicación: https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
                  window.open(`https://api.whatsapp.com/send?phone=573161034386&text=${encodeURIComponent(mensaje)}`, '_blank');
                }, () => {
                  alert('No se pudo obtener la ubicación. Activa el GPS y vuelve a intentarlo.');
                });
              } else {
                alert('Tu navegador no soporta geolocalización.');
              }
            }}
          >
            Soporte inutrips (enviar ubicación)
          </button>
        </div>
    </div>
  );
}

export default PetInfo;
