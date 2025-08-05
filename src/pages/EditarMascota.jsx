import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarMascota() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener datos de la mascota para mostrar la info actual
    const fetchMascota = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const res = await fetch(`${apiUrl}/pets/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setMascota(data);
      } catch (error) {
        console.error('Error al cargar la mascota:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [apiUrl, id]);

  const handleImagen = (e) => {
    setNuevaImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaImagen && !mascota?.name) {
      alert('Debes ingresar al menos un dato para actualizar');
      return;
    }
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const formData = new FormData();
      if (nuevaImagen) formData.append('image', nuevaImagen);

      // Solo permite editar nombre y foto, nunca el petCode
      formData.append('name', mascota.name);

      const res = await fetch(`${apiUrl}/pets/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error al actualizar la mascota');
      }
      alert('Mascota actualizada correctamente');
      navigate('/mypets');
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
      alert('No se pudo actualizar la mascota');
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">Editar Mascota</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : mascota ? (
        <>
          <div className="mb-4 text-center">
            <img
              src={mascota.pet.image ? mascota.pet.image : 'https://via.placeholder.com/300x200?text=Mascota'}
              alt="Foto actual"
              style={{ maxWidth: '300px', borderRadius: '10px' }}
            />
            <div className="mt-2">
              <span className="badge bg-secondary">ID: {mascota.pet.petCode.code}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={mascota.name}
                onChange={e => setMascota({ ...mascota, name: e.target.value })}
                required
                maxLength={30}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nueva foto</label>
              <input type="file" className="form-control" onChange={handleImagen} accept="image/*" />
            </div>
            <div className="mb-3">
              <label className="form-label">PetCode (solo lectura)</label>
              <input
                type="text"
                className="form-control"
                value={mascota.petCode}
                readOnly
                disabled
              />
              <small className="text-muted">Este código QR es único y no se puede cambiar.</small>
            </div>
            <button type="submit" className="btn btn-success">Guardar Cambios</button>
            <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => navigate('/mypets')}>
              Cancelar
            </button>
          </form>
        </>
      ) : (
        <p>No se encontró la mascota.</p>
      )}
    </div>
  );
}

export default EditarMascota;