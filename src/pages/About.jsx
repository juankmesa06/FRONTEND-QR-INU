import React from 'react';
import '../assets/About.css'; // ✅ Esto está correcto

function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h2 className="about-title">Quiénes Somos</h2>
        <p className="about-text">
          Somos un equipo comprometido con el bienestar animal. Nuestra misión es proteger y ayudar a encontrar mascotas perdidas utilizando tecnología moderna y accesible.
        </p>
        <div className="about-contact">
          <h3>Contáctanos</h3>
          <p>Email: <a href="mailto:contacto@qrm.com">contacto@qrm.com</a></p>
        </div>
      </div>
    </div>
  );
}

export default About;
