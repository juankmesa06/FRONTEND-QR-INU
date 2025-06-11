import React from 'react';
import '../assets/ReportLostPet.css'; // Asegúrate de tener este archivo CSS o ajusta el estilo en línea si prefieres

function ReportLostPet() {
  return (
    <div className="report-container">
      <div className="report-card">
        <h2 className="report-title">🐾 Denunciar Mascota Perdida</h2>
        <form>
          <input type="text" className="report-input" placeholder="Nombre de la mascota" />
          <input type="text" className="report-input" placeholder="Última ubicación conocida" />
          <input type="text" className="report-input" placeholder="Teléfono de contacto" />
          <textarea className="report-textarea" rows="4" placeholder="Descripción adicional" />
          <button type="submit" className="report-button">🚨 Denunciar</button>
        </form>
      </div>
    </div>
  );
}

export default ReportLostPet;
