import React, { useState } from 'react';
import '../assets/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validaciones de los campos
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.last_name.trim()) newErrors.last_name = 'El apellido es obligatorio';
    if (!formData.email.includes('@')) newErrors.email = 'Correo electrónico inválido';
    if (formData.password.length < 6)
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // limpiar error al escribir
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return; // ⚠️ Detiene si hay errores

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || 'Error en el registro');
      } else {
        alert('Registro exitoso');
      }
    } catch (error) {
      alert('Error en el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear cuenta</h2>
        <form onSubmit={handleRegister} noValidate>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}

          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="register-input"
          />
          {errors.last_name && <div className="text-danger">{errors.last_name}</div>}

          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}

          <button type="submit" disabled={loading} className="register-button">
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
