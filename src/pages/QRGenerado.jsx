import React from 'react';
import '../assets/ReportLostPet.css';
import perroIlustracion from '../assets/QR.png'; // o el nombre de tu imagen

function ReportLostPet() {
  return (
    <div className="report-container">
      <div className="report-card">
        <h2 className="report-title">Aca esta tu QR !</h2>

        <img src={perroIlustracion} alt="Mascota" className="report-image" />

        
       <p className="about-text">
           nombreMascota: "Firulais", 
        </p>
        <p className="about-text">
           nombreDueno: "Juan Pérez",
        </p>
        <p className="about-text">
           email: "juan@example.com",
        </p>
        <p className="about-text">
            telefono: "3001234567"
        </p>
        <button className="report-button">Continuar</button>
      </div>
    </div>
  );
}

export default ReportLostPet;
