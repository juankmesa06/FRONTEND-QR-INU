// src/pages/GenerarCodigos.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function GenerarCodigos() {
  const [cantidad, setCantidad] = useState(1);
  const [qrs, setQrs] = useState([]);
  const [loading, setLoading] = useState(false);

  const generarCodigos = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const res = await fetch(`http://localhost:3000/api/admin/generate-codes/${cantidad}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Error generando los códigos');

      const data = await res.json();
      setQrs(data);
    } catch (err) {
      console.error(err);
      alert('No se pudieron generar los códigos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-inu mb-4">⚙️ Generador de Códigos QR</h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <label className="form-label">Cantidad de códigos a generar</label>
          <input
            type="number"
            className="form-control"
            min={1}
            max={100}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn btn-inu px-5 py-2"
          onClick={generarCodigos}
          disabled={loading}
        >
          {loading ? 'Generando...' : 'Generar Códigos'}
        </button>
      </div>

      {qrs.length > 0 && (
        <div className="mt-5">
          <h4 className="text-center mb-3">📦 Códigos Generados</h4>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {qrs.map((qr, i) => (
              <div className="col" key={i}>
                <div className="card p-3 text-center h-100 shadow-sm">
                  <img src={qr.qr} alt="Código QR" className="img-fluid mb-2" />
                  <p className="fw-bold">Código: {qr.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerarCodigos;
