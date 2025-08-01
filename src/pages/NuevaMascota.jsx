import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/NuevaMascota.css';

const NuevaMascota = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: 0,
    species: '',
    breed: '',
    gender: '',
    size: '',
    petCode: '',
  });

  const [imageFile, setImageFile] = useState('');
  const [petCodeError, setPetCodeError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'petCode') setPetCodeError('');
  };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      const res = await fetch('http://localhost:3000/api/files/pet', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setImageFile(result.fileName);
    } catch (error) {
      console.error('Error al subir la imagen', error);
      alert('Ocurrió un error al subir la imagen');
    }
  };

  const verificarPetCodeDisponible = async (code) => {
    try {
      const res = await fetch(`http://localhost:3000/api/pets/pet-code/${code}`);
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

      const res = await fetch('http://localhost:3000/api/pets', {
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

  return (
    <div className="login-inu-wrapper d-flex align-items-center justify-content-center mt-navbar-spacing">
      <div className="login-inu-box shadow-lg">
        <div className="text-center mb-4">
          <img src="/images/LOGO PRINCIPAL.png" alt="INUTrips Logo" style={{ height: '60px' }} />
          <h2 className="mt-3 text-inu-dark fw-bold">Agregar Nueva Mascota</h2>
          <p className="text-muted">Llena los datos para registrar tu mascota</p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            />
          </div>

          {/* Campos con lista de opciones */}
          {[
            {
              label: 'Especie',
              name: 'species',
              options: ['Perro', 'Gato', 'Ave', 'Conejo', 'Otro'],
            },
            {
              label: 'Raza',
              name: 'breed',
              options: ['Labrador', 'Criollo', 'Poodle', 'Siames', 'Persa', 'Otro'],
            },
            {
              label: 'Género',
              name: 'gender',
              options: ['Macho', 'Hembra'],
            },
            {
              label: 'Tamaño',
              name: 'size',
              options: ['Pequeño', 'Mediano', 'Grande'],
            },
          ].map(({ label, name, options }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Seleccione una opción</option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}

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
