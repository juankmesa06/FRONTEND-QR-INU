import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerCodigos = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [codigos, setCodigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(50); // cantidad seleccionada

  const fetchCodigos = async (limite) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      const res = await fetch(`${apiUrl}/admin/generated-codes/${limite}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCodigos(data);
    } catch (error) {
      console.error('Error al obtener los códigos:', error);
      alert('Error al obtener los códigos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodigos(cantidad);
  }, [cantidad]);
// ...existing code...
const descargarQRyCodigo = (item) => {
  const canvas = document.createElement('canvas');
  const width = 220;
  const height = 270;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Fondo blanco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  // Cargar imagen QR
  const img = new window.Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    // Dibuja el QR centrado
    ctx.drawImage(img, 10, 10, 200, 200);

    // Texto del código
    ctx.font = "bold 22px Nunito, Arial";
    ctx.fillStyle = "#3d2c1e";
    ctx.textAlign = "center";
    ctx.fillText(item.code, width / 2, 235);

    // Marca INUTrips (opcional)
    ctx.font = "bold 15px Nunito, Arial";
    ctx.fillStyle = "#f9af15";
    ctx.fillText("INUTRIPS", width / 2, 260);

    // Descargar imagen
    const link = document.createElement('a');
    link.download = `QR-${item.code}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  img.src = item.qr;
};
// ...existing code...

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-inu-dark mb-4">
        ⚙️ Códigos QR No Reclamados
      </h2>

      <div className="mb-4 text-center">
        <label htmlFor="cantidad" className="form-label me-2 fw-semibold">
          Ver cantidad:
        </label>
        <select
          id="cantidad"
          className="form-select d-inline-block w-auto"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Cargando códigos...</p>
      ) : codigos.length === 0 ? (
        <p className="text-center text-muted">No hay códigos disponibles</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>QR</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {codigos.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold text-primary">{item.code}</td>
                  <td>
                    <img
                      src={item.qr}
                      alt={`QR ${item.code}`}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                     
                      <button
  className="btn btn-outline-primary btn-sm"
  onClick={() => descargarQRyCodigo(item)}
>
  ⬇️ Descargar QR + Código
</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerCodigos;
