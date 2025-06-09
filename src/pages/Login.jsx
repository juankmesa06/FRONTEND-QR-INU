// src/pages/Login.jsx
import React from 'react';

function Login() {
  return (
    <div className="mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
      <form>
        <input type="email" className="form-control mb-3" placeholder="Correo electrónico" />
        <input type="password" className="form-control mb-3" placeholder="Contraseña" />
        <button type="submit" className="btn btn-success w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
