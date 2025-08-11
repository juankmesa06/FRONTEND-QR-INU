import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'No se pudo cambiar la contraseña');
      } else {
        setOk(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch {
      setError('Error al conectar con el servidor');
    }
  };

  if (!token) {
    return <div className="container py-5"><div className="alert alert-danger">Token inválido</div></div>;
  }

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Restablecer contraseña</h2>
      {ok ? (
        <div className="alert alert-success">Contraseña cambiada correctamente. Redirigiendo...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary w-100" type="submit">Cambiar contraseña</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;