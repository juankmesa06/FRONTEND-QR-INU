// src/pages/Register.jsx 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validación rápida
  const validate = () => {
    const newErrors = {};

    const dangerousChars = /[<>{}()$'"`]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    } else if (dangerousChars.test(formData.name) || /^\s/.test(formData.name)) {
      newErrors.name = "Nombre inválido (caracteres no permitidos o espacios iniciales)";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "El apellido es obligatorio";
    } else if (dangerousChars.test(formData.last_name) || /^\s/.test(formData.last_name)) {
      newErrors.last_name = "Apellido inválido (caracteres no permitidos o espacios iniciales)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "Debe tener al menos 8 caracteres";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "El teléfono debe tener exactamente 10 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error en el registro");
      } else {
        alert("Registro exitoso");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* ICONO DE MARCA */}
        <img src="/images/LOGO PRINCIPAL.png" alt="INUTrips Logo" style={{ height: '60px' }} />

        <h2 className="register-title">Crear cuenta</h2>
        <p className="register-subtitle">
          Regístrate para comenzar a gestionar tus mascotas
        </p>

        <form onSubmit={handleRegister} noValidate>
          {/* Nombre */}
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
          />
          {errors.name && <div className="error-msg">{errors.name}</div>}

          {/* Apellido */}
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="register-input"
          />
          {errors.last_name && <div className="error-msg">{errors.last_name}</div>}

          {/* Correo */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}

          {/* Contraseña */}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}

          {/* Teléfono */}
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            className="register-input"
          />
          {errors.phone && <div className="error-msg">{errors.phone}</div>}

          {/* Botón */}
          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Registrando…" : "Registrarse"}
          </button>
        </form>

        {/* Enlace a login */}
        <p className="mt-3 text-center small">
          ¿Ya tienes cuenta?{" "}
          <span className="inu-link" onClick={() => navigate("/login")}>
            Inicia sesión aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
