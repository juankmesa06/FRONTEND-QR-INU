// src/pages/ReportLostPet.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReportLostPet() {
  const navigate = useNavigate();

  const handleResult = (result, error) => {
    if (!!result) {
      const qrText = result?.text;
      if (qrText) {
        // Redirige automáticamente a la página de la mascota
        navigate(`/mascota/${encodeURIComponent(qrText)}`);
      }
    }
  };

  return (
    <div className="container my-5 text-center">
      <h2 className="mb-4">📷 Escanea el QR de la Mascota Encontrada</h2>
      <p className="mb-4">Usa tu cámara para leer el código QR del collar de la mascota</p>

      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: 400, width: '100%' }}>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={handleResult}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <p className="mt-3 text-muted">Apunta la cámara al código QR para ver la información del dueño.</p>
    </div>
  );
}

export default ReportLostPet;
