import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ReportLostPet.css';

function ReportLostPet() {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState('');
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Obtener cámaras disponibles
    Html5Qrcode.getCameras()
      .then((devices) => {
        setCameras(devices);
        if (devices.length > 0) setSelectedCameraId(devices[0].id);
      })
      .catch(() => setCameras([]));
  }, []);

  useEffect(() => {
    if (!selectedCameraId) return;
    const scannerId = 'reader';
    const html5QrCode = new Html5Qrcode(scannerId);
    scannerRef.current = html5QrCode;
    setScanning(true);

    html5QrCode
      .start(
        selectedCameraId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          html5QrCode
            .stop()
            .then(() => {
              html5QrCode.clear();
              setScanning(false);
              window.location.href = decodedText;
            })
            .catch(() => setScanning(false));
        },
        (error) => {
          // Puedes mostrar errores si quieres
        }
      )
      .catch(() => setScanning(false));

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch(() => {});
      }
    };
  }, [selectedCameraId]);

  return (
    <div className="container py-5" style={{ fontFamily: "'Nunito', Arial, sans-serif" }}>
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h2 className="mb-3 fw-bold text-inu">
                <i className="bi bi-qr-code-scan me-2 text-warning"></i>
                Escanea el código QR de la mascota
              </h2>
              <p className="text-muted mb-4">Coloca el código QR frente a tu cámara y selecciona la cámara que prefieras.</p>
              <div className="mb-3">
                <label htmlFor="cameraSelect" className="form-label fw-bold">
                  Selecciona cámara:
                </label>
                <select
                  id="cameraSelect"
                  className="form-select w-auto d-inline-block ms-2"
                  value={selectedCameraId}
                  onChange={e => setSelectedCameraId(e.target.value)}
                  disabled={cameras.length === 0 || scanning}
                >
                  {cameras.length === 0 && <option>No hay cámaras</option>}
                  {cameras.map((cam, idx) => (
                    <option key={cam.id} value={cam.id}>
                      {cam.label || `Cámara ${idx + 1}`}
                    </option>
                  ))}
                </select>
              </div>
              <div
                id="reader"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  margin: '0 auto',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 2px 16px 0 rgba(249,175,21,0.10)'
                }}
              ></div>
              <div className="mt-4">
                <span className="badge bg-warning text-dark px-3 py-2">
                  {scanning ? 'Escaneando...' : 'Selecciona una cámara para empezar'}
                </span>
              </div>
              <div className="mt-4">
                <i className="bi bi-shield-check text-success fs-3"></i>
                <p className="small text-muted mt-2 mb-0">
                  Tu información está protegida. Solo se usará para reportar la mascota perdida.
                </p>
                <p className="small text-muted mt-2 mb-0">
                  Al escanear el código QR, aceptas nuestros términos y condiciones.
                </p>
                <p className="small text-muted mt-2 mb-0">
                  Puedes consultar nuestra política de privacidad para más información.
                </p>
                <p className="small text-muted mt-2 mb-0">
                  Si tienes preguntas, no dudes en contactarnos.
                </p>
                <p className="small text-muted mt-2 mb-0">
                  Estamos aquí para ayudarte.
                </p>
                <p className="small text-muted mt-2 mb-0">
                  Si necesitas asistencia, por favor contáctanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportLostPet;