// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Función para validar campos
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenChars = /[<>"]/;

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Correo inválido';
    }
    if (forbiddenChars.test(formData.email)) {
      newErrors.email = 'Caracteres inválidos en el correo';
    }
    if (forbiddenChars.test(formData.password)) {
      newErrors.password = 'Caracteres no permitidos en la contraseña';
    }
    if (formData.password.trim().length < 6) {
      newErrors.password = 'Contraseña muy corta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Limpiar error al escribir
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || 'Correo o contraseña incorrecta');
      } else {
        login({ token: result.token });
        alert('Inicio de sesión exitoso');
        setTimeout(() => navigate('/mypets'), 100);
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-inu-wrapper d-flex align-items-center justify-content-center">
      <div className="login-inu-box shadow-lg">
        <div className="text-center mb-4">
          <img src="/images/LOGO PRINCIPAL.png" alt="INUTrips Logo" style={{ height: '60px' }} />
          <h2 className="mt-3 text-inu-dark fw-bold">Inicia Sesión</h2>
          <p className="text-muted">Accede para gestionar a tus mascotas</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}

            <div className="text-end mt-1">
              <Link to="/recuperar" className="small text-primary">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          <button type="submit" className="btn btn-inu w-100" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p>
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="fw-bold text-primary text-decoration-none">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
