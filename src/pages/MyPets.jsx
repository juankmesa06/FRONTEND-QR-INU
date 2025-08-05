import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/MyPets.css';

const placeholderImg = "https://via.placeholder.com/300x200?text=Mascota";

function MyPets() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'))?.user || {};
  const isAdmin = user?.role === 'admin';

  const fetchMascotas = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      if (!token) {
        alert('Token no encontrado. Por favor inicia sesión.');
        navigate('/login');
        return;
      }

      const res = await fetch(`${apiUrl}/pets`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert('No autorizado. Vuelve a iniciar sesión.');
        navigate('/login');
        return;
      }

      if (!res.ok) {
        throw new Error('Error al cargar mascotas');
      }

      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al obtener las mascotas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const editarMascota = (id) => {
    navigate(`/editar-mascota/${id}`);
  };

  const eliminarMascota = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      await fetch(`${apiUrl}/pets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`,
        },
      });

      alert('Mascota eliminada con éxito');
      fetchMascotas();
    }
  };

  const agregarMascota = () => {
    navigate('/nueva-mascota');
  };

  const irADashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="container py-4">
      <div className="mypets-header">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="mypets-title">
            <span role="img" aria-label="paw">🐾</span> Mis Mascotas
          </h2>
          <div className="d-flex gap-2 flex-wrap">
            {isAdmin && (
              <button onClick={irADashboard} className="btn btn-dark">
                Panel Administrador
              </button>
            )}
            <button onClick={agregarMascota} className="btn-inu-agregar">
              ➕ Agregar Mascota
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Cargando mascotas...</p>
      ) : mascotas.length === 0 ? (
        <p className="text-center">No tienes mascotas registradas.</p>
      ) : (
        <div className="row">
          {mascotas.map((m) => (
            <div className="col-md-6 col-lg-4 mb-4" key={m.id}>
              <div className="card shadow-sm border-0 pet-card-custom">
                <img src={`http://localhost:3000/api/files/pet/${m.image}`} alt={m.nombre} className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title">{m.nombre}</h5>
                  <p className="card-text">
                    <strong>Nombre:</strong> {m.name} <br />
                    <strong>Especie:</strong> {m.species}<br />
                    <strong>Edad:</strong> {m.age} años
                  </p>
                  <button
                    onClick={() => editarMascota(m.id)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarMascota(m.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPets;
