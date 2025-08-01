import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReportLostPet() {
  const scannerRef = useRef(null); // ← guardar referencia para limpieza

  useEffect(() => {
    const scannerId = 'reader';
    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length === 0) throw new Error('No se encontraron cámaras');

        await html5QrCode.start(
          devices[0].id,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            console.log('✅ QR leído:', decodedText);
            html5QrCode
              .stop()
              .then(() => {
                html5QrCode.clear();
                window.location.replace(`${decodedText}`);
              })
              .catch((err) => console.error('Error al detener escáner:', err));
          },
          (error) => {
            console.log(error);
            
            // QR no detectado (normal)
            // console.warn("No QR detectado:", error);
          }
        );
      } catch (error) {
        console.error('❌ Error al iniciar el escáner:', error);
      }
    };

    startScanner();

    // 🔁 Limpieza
    return () => {
      if (scannerRef.current?.getState() === 2) { // 2 = SCANNING
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch((err) => console.warn('⚠️ Escáner no estaba activo:', err));
      }
    };
  }, []);

  return (
    <div className="container text-center py-5">
      <h2 className="mb-3">📷 Escanea el código QR de la mascota</h2>
      <p className="text-muted">Coloca el código QR frente a tu cámara</p>
      <div
        id="reader"
        style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
      ></div>
    </div>
  );
}

export default ReportLostPet;
