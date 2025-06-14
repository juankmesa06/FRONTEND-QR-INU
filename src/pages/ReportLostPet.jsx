// src/pages/ReportLostPet.jsx
import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import 'bootstrap/dist/css/bootstrap.min.css';

function ReportLostPet() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (qrCodeMessage) => {
        console.log("QR leído:", qrCodeMessage);
        // Redirigir a otra ruta con el código escaneado
        window.location.href = `/mascota/${qrCodeMessage}`;
      },
      (error) => {
        console.warn("Escaneo fallido:", error);
      }
    );
  }, []);

  return (
    <div className="container text-center py-5">
      <h2>📷 Escanea el código QR de la mascota</h2>
      <p>Coloca el código QR frente a tu cámara</p>
      <div id="reader" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}></div>
    </div>
  );
}

export default ReportLostPet;
