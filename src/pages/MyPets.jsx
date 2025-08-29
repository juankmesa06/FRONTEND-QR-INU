import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/MyPets.css';

const placeholderImg = "https://via.placeholder.com/300x200?text=Mascota";

function MyPets() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlerta, setShowAlerta] = useState(false);
  const [editImgId, setEditImgId] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [search, setSearch] = useState(""); // Nueva funcionalidad: búsqueda

  const user = JSON.parse(localStorage.getItem('user'))?.user || {};
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (localStorage.getItem('mascotaPerdida') === '1') {
      setShowAlerta(true);
      localStorage.removeItem('mascotaPerdida');
    }
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = async (e, petId) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadRes = await fetch(`${apiUrl}/files/pet`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      const imageUrl = uploadData.secureUrl;

      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await fetch(`${apiUrl}/pets/${petId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageUrl }),
      });
      fetchMascotas();
      setEditImgId(null);
    } catch  {
      alert('Error al actualizar la foto');
    }
    setImgLoading(false);
  };

  const eliminarMascota = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
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

  // Nueva funcionalidad: búsqueda de mascotas por nombre o especie
  const mascotasFiltradas = mascotas.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.species.toLowerCase().includes(search.toLowerCase())
  );

  let mascotasContent;
  if (loading) {
    mascotasContent = <p className="text-center">Cargando mascotas...</p>;
  } else if (mascotasFiltradas.length === 0) {
    mascotasContent = <p className="text-center">No tienes mascotas registradas o no hay coincidencias.</p>;
  } else {
    mascotasContent = (
      <div className="row">
        {mascotasFiltradas.map((m) => (
          <div className="col-md-6 col-lg-4 mb-4" key={m.id}>
            <div className="card pet-card-custom shadow-sm border-0">
              <div className="pet-img-wrapper position-relative">
                <img src={m.image || placeholderImg} alt={m.nombre} className="pet-img" />
                <button
                  className="btn btn-outline-inu btn-sm pet-img-edit-btn"
                  style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 2 }}
                  onClick={() => setEditImgId(m.id)}
                  type="button"
                >
                  Cambiar foto
                </button>
                {editImgId === m.id && (
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mt-2"
                    style={{ position: 'absolute', bottom: 40, right: 10, width: 150, zIndex: 3, background: "#fff" }}
                    onChange={(e) => handleImageChange(e, m.id)}
                    disabled={imgLoading}
                  />
                )}
              </div>
              <div className="card-body text-center">
                <h5 className="card-title mb-1">{m.name}</h5>
                <div className="mb-2">
                  <span className="badge bg-inu me-1">{m.species}</span>
                  <span className="badge bg-light text-dark me-1">{m.age} años</span>
                  <span className="badge bg-secondary">ID: {m.petCode.code}</span>
                </div>
                <div className="mb-2">
                  <img src={m.qr} alt={m.petCode.id} className="pet-qr-img" />
                </div>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <button
                    onClick={() => eliminarMascota(m.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="">
      {showAlerta && (
        <div className="alert alert-danger alert-dismissible fade show text-center mb-4" role="alert">
          <strong>¡Atención!</strong> tienes una mascota como perdida.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlerta(false)}
            style={{ position: 'absolute', right: 16, top: 16 }}
          ></button>
        </div>
      )}
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
            <a
              href="https://play.google.com/store/apps/details?id=com.inutrips.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              🚗 Pedir un viaje
            </a>
          </div>
        </div>
        {/* Nueva funcionalidad: búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o especie..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 350, margin: '0 auto' }}
          />
        </div>
        <section className="dashboard-cta mt-5">
          <h4 className="fw-bold text-center mb-4">📌 Acciones Rápidas</h4>
          <div className="row g-3 justify-content-center">
            {[
              {
                text: '✅ Mis Medallas Compradas',
                route: '/compras',
                className: 'btn btn-outline-success'
              },
            ].map((btn, index) => (
              <div className="col-12 col-md-auto" key={index}>
                <button className={`${btn.className} px-4 py-2 w-100`} onClick={() => navigate(btn.route)}>
                  {btn.text}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      {mascotasContent}
    </div>
  );
}

export default MyPets;