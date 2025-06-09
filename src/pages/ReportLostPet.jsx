// src/pages/ReportLostPet.jsx
import React from 'react';

function ReportLostPet() {
  return (
    <div className="mx-auto" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Denunciar Mascota Perdida</h2>
      <form>
        <input type="text" className="form-control mb-3" placeholder="Nombre de la mascota" />
        <input type="text" className="form-control mb-3" placeholder="Última ubicación conocida" />
        <input type="text" className="form-control mb-3" placeholder="Teléfono de contacto" />
        <textarea className="form-control mb-3" rows="4" placeholder="Descripción adicional" />
        <button type="submit" className="btn btn-danger w-100">Denunciar</button>
      </form>
    </div>
  );
}

export default ReportLostPet;
