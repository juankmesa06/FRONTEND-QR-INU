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
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          navigator.clipboard.writeText(item.code);
                          alert('Código copiado al portapapeles');
                        }}
                      >
                        📋 Copiar Código
                      </button>
                      <a
                        href={item.qr}
                        download={`QR-${item.code}.png`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        ⬇️ Descargar QR
                      </a>
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
