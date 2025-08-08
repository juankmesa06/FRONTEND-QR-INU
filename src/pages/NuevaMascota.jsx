import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/NuevaMascota.css';

const RAZAS = {
  Perro: [
    'Labrador Retriever', 'Bulldog', 'Poodle', 'Golden Retriever', 'Chihuahua',
    'Pastor Alemán', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Boxer',
    'Dálmata', 'Schnauzer', 'Shih Tzu', 'Cocker Spaniel', 'Doberman',
    'Pug', 'Border Collie', 'French Bulldog', 'Husky Siberiano', 'Mestizo'
  ],
  Gato: [
    'Siames', 'Persa', 'Maine Coon', 'Bengala', 'Ragdoll',
    'Sphynx', 'British Shorthair', 'Abisinio', 'Scottish Fold', 'Bombay',
    'Azul Ruso', 'Bosque de Noruega', 'Manx', 'Oriental', 'Himalayo',
    'Angora', 'Exótico', 'Savannah', 'Munchkin', 'Mestizo'
  ],
  Ave: [
    'Periquito', 'Canario', 'Cacatúa', 'Agapornis', 'Loro',
    'Diamante Mandarín', 'Ninfa', 'Guacamayo', 'Jilguero', 'Cotorra',
    'Pinzón', 'Tucán', 'Paloma', 'Gorrión', 'Calopsita',
    'Amazonas', 'Cacique', 'Cardenal', 'Aratinga', 'Otro'
  ],
  Conejo: [
    'Enano Holandés', 'Cabeza de León', 'Mini Lop', 'Rex', 'Angora',
    'Belier', 'Californiano', 'Chinchilla', 'Flemish Giant', 'Hotot',
    'Himalayo', 'Mini Rex', 'Polish', 'Satin', 'Tan',
    'English Spot', 'Dutch', 'Harlequin', 'Lop', 'Otro'
  ],
  Otro: [
    'Mestizo', 'Desconocida', 'Otra'
  ]
};

const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Otro'];

const GENEROS = ['Macho', 'Hembra'];
const TAMANOS = ['Pequeño', 'Mediano', 'Grande'];

const NuevaMascota = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [form, setForm] = useState({
    name: '',
    age: '',
    species: '',
    breed: '',
    gender: '',
    size: '',
    petCode: '',
  });

  const [imageFile, setImageFile] = useState('');
  const [petCodeError, setPetCodeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si cambia la especie, limpia la raza
    if (name === 'species') {
      setForm({ ...form, species: value, breed: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
    if (name === 'petCode') setPetCodeError('');
  };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const res = await fetch(`${apiUrl}/files/pet`, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setImageFile(result.secureUrl);
    } catch (error) {
      console.error('Error al subir la imagen', error);
      alert('Ocurrió un error al subir la imagen');
    }
  };

  const verificarPetCodeDisponible = async (code) => {
    try {
      const res = await fetch(`${apiUrl}/pets/pet-code/${code}`);
      const data = await res.json();
      return !data;
    } catch (err) {
      console.error('Error al verificar petCode', err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.petCode) {
      setPetCodeError('Debes ingresar el código QR (PetCode)');
      return;
    }

    const disponible = await verificarPetCodeDisponible(form.petCode);
    if (!disponible) {
      setPetCodeError('Este código QR ya está registrado o no está disponible');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const res = await fetch(`${apiUrl}/pets`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, age: +form.age, image: imageFile }),
      });

      if (!res.ok) throw new Error('Error al registrar la mascota');
      alert('Mascota registrada con éxito');
      navigate('/mypets');
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al registrar la mascota');
    }
  };

  // Razas según especie seleccionada
  const razasOptions = form.species ? RAZAS[form.species] : [];

  return (
    <div className="login-inu-wrapper d-flex align-items-center justify-content-center mt-navbar-spacing">
      <div className="login-inu-box shadow-lg">
        <div className="text-center mb-4">
          <img src="/images/LOGO PRINCIPAL.png" alt="INUTrips Logo" style={{ height: '60px' }} />
          <h2 className="mt-3 text-inu-dark fw-bold">Agregar Nueva Mascota</h2>
          <p className="text-muted">Llena los datos para registrar tu mascota</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
          {/* PetCode */}
          <div className="mb-3">
            <label className="form-label">PetCode (ID del QR)</label>
            <input
              type="text"
              name="petCode"
              value={form.petCode}
              onChange={handleChange}
              className={`form-control ${petCodeError ? 'is-invalid' : ''}`}
              required
              autoComplete="off"
            />
            {petCodeError && <div className="invalid-feedback">{petCodeError}</div>}
          </div>

          {/* Nombre de la mascota */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
              autoComplete="off"
            />
          </div>

          {/* Especie */}
          <div className="mb-3">
            <label className="form-label">Especie</label>
            <select
              name="species"
              value={form.species}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una opción</option>
              {ESPECIES.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Raza */}
          <div className="mb-3">
            <label className="form-label">Raza</label>
            <select
              name="breed"
              value={form.breed}
              onChange={handleChange}
              className="form-select"
              required
              disabled={!form.species}
            >
              <option value="">Seleccione una opción</option>
              {razasOptions.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Género */}
          <div className="mb-3">
            <label className="form-label">Género</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una opción</option>
              {GENEROS.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Tamaño */}
          <div className="mb-3">
            <label className="form-label">Tamaño</label>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una opción</option>
              {TAMANOS.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Edad */}
          <div className="mb-3">
            <label className="form-label">Edad (en años)</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="form-control"
              min="0"
              required
            />
          </div>

          {/* Imagen */}
          <div className="mb-4">
            <label className="form-label">Fotografía de la mascota</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-inu w-100">
            Registrar Mascota
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevaMascota;