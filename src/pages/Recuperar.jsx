import React, { useState } from 'react';

const Recuperar = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'No se pudo enviar el correo');
      } else {
        setEnviado(true);
      }
    } catch {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Recuperar contraseña</h2>
      {enviado ? (
        <div className="alert alert-success">
          Si el correo existe, recibirás un enlace para restablecer tu contraseña.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary w-100" type="submit">Enviar enlace</button>
        </form>
      )}
    </div>
  );
};

export default Recuperar;