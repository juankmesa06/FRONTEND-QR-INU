import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/PetInfo.css';

function PetInfo() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const { qrCode } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`${apiUrl}/pets/code/${qrCode}`);
        if (!res.ok) throw new Error('Mascota no encontrada');
        const data = await res.json();
        setPet(data);
      } catch {
        setPet(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [qrCode, apiUrl]);

  // Ocultar alerta automáticamente después de 4 segundos
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: '', message: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const crearReporte = async (loc) => {
    const body = {
      petId: pet.pet.id,
      message: "Mascota reportada como perdida desde QR",
      location: loc
    };
    try {
      const res = await fetch(`${apiUrl}/lost-pet-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setAlert({ type: 'success', message: '¡Reporte de mascota perdida enviado!' });
      } else {
        setAlert({ type: 'danger', message: 'No se pudo enviar el reporte' });
      }
    } catch {
      setAlert({ type: 'danger', message: 'Error al conectar con el servidor' });
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando información de la mascota...</p>;
  if (!pet) return <p className="text-center text-danger mt-5">Mascota no encontrada</p>;

  return (
    <div className="petinfo-card">
      {/* Alerta visual */}
      {alert.message && (
        <div className={`alert alert-${alert.type} text-center petinfo-alert`} role="alert">
          {alert.message}
        </div>
      )}

      {/* Imagen y nombre */}
      <div className="text-center mb-3">
        <img
          src={pet.pet.image || "/placeholder.svg"}
          alt="Foto mascota"
          className="petinfo-avatar"
          
        />
        <h3 className="petinfo-name">{pet.pet.name}</h3>
        <span className="petinfo-species">{pet.pet.species}</span>
      </div>

      {/* Datos de la mascota */}
      <ul className="list-group list-group-flush mb-3 petinfo-list-group">
        <li className="list-group-item"><strong>Edad:</strong> {pet.pet.age} años</li>
        <li className="list-group-item"><strong>Raza:</strong> {pet.pet.breed}</li>
        <li className="list-group-item"><strong>Género:</strong> {pet.pet.gender}</li>
        <li className="list-group-item"><strong>Tamaño:</strong> {pet.pet.size}</li>
      </ul>
      <hr />
      {/* Dueño */}
      <div className="petinfo-owner mb-3">
        <p className="mb-1"><strong>Dueño:</strong> {pet.pet.owner.name} {pet.pet.owner.last_name}</p>
        <p className="mb-1"><strong>Teléfono:</strong> {pet.pet.owner.phone}</p>
      </div>

      {/* Botones de acción */}
      <div className="d-flex flex-column gap-2 mt-3 petinfo-actions">
        <a
          href={`https://wa.me/57${pet.pet.owner.phone}?text=Hola, encontramos tu mascota ${pet.pet.name} usando el QR de INUTrips.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          <i className="bi bi-whatsapp me-2"></i>
          Contactar dueño
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
                setAlert({ type: 'danger', message: 'No se pudo obtener la ubicación. Activa el GPS y vuelve a intentarlo.' });
              });
            } else {
              setAlert({ type: 'danger', message: 'Tu navegador no soporta geolocalización.' });
            }
          }}
        >
          <i className="bi bi-geo-alt me-2"></i>
          <span>Soporte INUTrips (enviar ubicación)</span>
        </button>
        <button
  className="btn btn-danger"
  onClick={async () => {
    let location = '';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        location = `${position.coords.latitude},${position.coords.longitude}`;
        await crearReporte(location);
        window.alert('¡Gracias! Esta mascota fue reportada como perdida. El dueño será notificado.');
      }, async () => {
        await crearReporte('');
        window.alert('¡Gracias! Esta mascota fue reportada como perdida. El dueño será notificado.');
      });
    } else {
      await crearReporte('');
      window.alert('¡Gracias! Esta mascota fue reportada como perdida. El dueño será notificado.');
    }
  }}
>
  <i className="bi bi-exclamation-triangle me-2"></i>{' '}
  Me encontre Esta Mascota
</button>
      </div>
    </div>
  );
}

export default PetInfo;