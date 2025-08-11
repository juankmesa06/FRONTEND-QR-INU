import React, { useEffect, useState } from 'react';

const Compras = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      if (!token) {
        alert('Debes iniciar sesión.');
        return;
      }
      try {
        const res = await fetch(`${apiUrl}/purchase`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('No se pudieron cargar las compras');
        const data = await res.json();
        setCompras(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompras();
  }, [apiUrl]);

  if (loading) return <p className="text-center my-5">Cargando compras...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Mis Compras</h2>
      {compras.length === 0 ? (
        <div className="alert alert-info">No tienes compras registradas.</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Items</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, idx) => (
              <tr key={idx}>
                <td>{new Date(compra.createdAt).toLocaleString('es-CO')}</td>
                <td>
                  <ul>
                    {compra.items.map((item, i) => (
                      <li key={i}>
                        {item.type} - {item.nameToEngrave} (${item.price})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{compra.status || 'Pendiente'}</td>
                <td>${compra.total || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Compras;