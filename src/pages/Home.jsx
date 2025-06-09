// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState('');

  const handleQrSubmit = (e) => {
    e.preventDefault();
    if (qrCode.trim()) {
      navigate(`/mascota/${qrCode.trim()}`);
    }
  };

  return (
    <>
      <section className="mb-5 text-center">
        <h2>¿Qué es QR Mascotas?</h2>
        <p>
          Es un sistema de identificación mediante códigos QR para encontrar fácilmente a tu mascota en caso de pérdida.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-center">Adquiere tu QR</h2>
        <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
          <form>
            <input className="form-control mb-3" placeholder="Nombre del dueño" />
            <input className="form-control mb-3" placeholder="Nombre de la mascota" />
            <input type="email" className="form-control mb-3" placeholder="Correo electrónico" />
            <input className="form-control mb-3" placeholder="Teléfono de contacto" />
            <button className="btn btn-success w-100" type="submit">Solicitar QR</button>
          </form>
        </div>
      </section>

      <section className="text-center mb-5">
        <h2>Consulta el QR de una mascota</h2>
        <form onSubmit={handleQrSubmit} className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
          <input
            className="form-control mb-3"
            placeholder="Ingresa código QR"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
          />
          <button className="btn btn-outline-success w-100" type="submit">Ver información</button>
        </form>
      </section>

      <section className="mb-5">
        <h2 className="text-center">Ventajas del sistema</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✓ Ayuda a recuperar mascotas perdidas</li>
          <li className="list-group-item">✓ Información accesible con solo escanear</li>
          <li className="list-group-item">✓ Fácil de usar desde cualquier dispositivo</li>
        </ul>
      </section>

      <section className="text-center mb-4">
        <h5>Descarga nuestra App</h5>
        <p>Disponible próximamente en:</p>
        <div>
          <a href="#" className="btn btn-dark m-1">Google Play</a>
          <a href="#" className="btn btn-dark m-1">App Store</a>
        </div>
      </section>

      <footer className="text-center text-muted mb-3">
        <small>
          Producto desarrollado por{' '}
          <a href="https://inutrips.com" target="_blank" rel="noopener noreferrer">
            inutrips.com
          </a>
        </small>
      </footer>
    </>
  );
}

export default Home;
