import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/MyPets.css';

// Imagen temporal desde internet
const placeholderImg = "https://via.placeholder.com/300x200?text=Mascota";

function MyPets() {
  const navigate = useNavigate();

  const mascotas = [
    {
      id: 1,
      nombre: 'Fido',
      especie: 'Perro',
      edad: 3,
      foto: placeholderImg,
      qr: 'QR123FIDO'
    },
    {
      id: 2,
      nombre: 'Mimi',
      especie: 'Gato',
      edad: 2,
      foto: placeholderImg,
      qr: 'QR456MIMI'
    }
  ];

  const editarMascota = (id) => {
    // Redirige a una página de edición con el ID de la mascota
    navigate(`/editar-mascota/${id}`);
  };

  const eliminarMascota = (id) => {
    // Lógica para eliminar la mascota (solo muestra por ahora)
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      console.log(`Mascota con ID ${id} eliminada`);
      // Aquí podrías hacer una petición al backend
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-4">🐾 Mis Mascotas</h2>
      <div className="row">
        {mascotas.map((m) => (
          <div className="col-md-6 col-lg-4 mb-4" key={m.id}>
            <div className="card shadow-sm border-0 pet-card-custom">
              <img src={m.foto} alt={m.nombre} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{m.nombre}</h5>
                <p className="card-text">
                  <strong>Especie:</strong> {m.especie}<br />
                  <strong>Edad:</strong> {m.edad} años<br />
                  <strong>ID QR:</strong> {m.qr}
                </p>
                <button onClick={() => editarMascota(m.id)} className="btn btn-sm btn-warning me-2">Editar</button>
                <button onClick={() => eliminarMascota(m.id)} className="btn btn-sm btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPets;
