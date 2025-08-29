import React, { useEffect, useState } from 'react';

const MascotasAdmin = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    const fetchMascotas = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.token;
        const res = await fetch(`${apiUrl}/pets/admin?limit=${limit}&offset=${offset}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('No se pudieron cargar las mascotas');
        const data = await res.json();
        setMascotas(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMascotas();
  }, [apiUrl, offset]);

  const handlePrev = () => setOffset(Math.max(0, offset - limit));
  const handleNext = () => setOffset(offset + limit);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Mascotas Registradas (Admin)</h2>
      {loading ? (
        <p>Cargando mascotas...</p>
      ) : mascotas.length === 0 ? (
        <div className="alert alert-info">No hay mascotas registradas.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Raza</th>
                  <th>Dueño</th>
                  <th>Fecha de registro</th>
                  <th>Imagen</th>
                </tr>
              </thead>
              <tbody>
                {mascotas.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.name}</td>
                    <td>{m.species}</td>
                    <td>{m.breed || '-'}</td>
                    <td>{m.owner?.email || '-'}</td>
                    <td>{m.created_at ? new Date(m.created_at).toLocaleString('es-CO') : '-'}</td>
                    <td>
                      {m.image ? (
                        <img src={m.image} alt={m.name} style={{ maxWidth: 60, borderRadius: 8 }} />
                      ) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-warning" onClick={handlePrev} disabled={offset === 0}>
              Anterior
            </button>
            <button className="btn btn-outline-warning" onClick={handleNext} disabled={mascotas.length < limit}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MascotasAdmin;