import React, { useEffect, useState } from 'react';
import '../assets/UsuariosRegistrados.css';

const UsuariosRegistrados = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.token;
        const res = await fetch(`${apiUrl}/auth/users?limit=20&offset=0`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('No se pudieron cargar los usuarios');
        const data = await res.json();
        setUsuarios(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, [apiUrl]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Usuarios Registrados</h2>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <div className="alert alert-info">No hay usuarios registrados.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Correo</th>
                <th>Nombre</th>
                
                <th>Fecha de registro</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.name || '-'}</td>
                  
                  <td>{u.created_at ? new Date(u.created_at).toLocaleString('es-CO') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsuariosRegistrados;