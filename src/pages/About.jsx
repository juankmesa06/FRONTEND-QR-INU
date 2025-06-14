import React from 'react';
import '../assets/About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-card">
        <h2 className="about-title">Quiénes Somos</h2>
        <p className="about-text">
          En <strong>QR Mascotas</strong> somos un equipo apasionado por el bienestar animal. Nacimos con la visión de usar la tecnología para proteger a nuestras mascotas, facilitando su localización en caso de pérdida.
        </p>
        <p className="about-text">
          Nuestra plataforma permite a los dueños registrar información clave de sus mascotas mediante un código QR, que cualquier persona puede escanear y ayudar a reunirlas con sus familias.
        </p>
      </section>

      <div className="about-sections">
        <section className="about-section">
          <h3>Misión</h3>
          <p>
            Brindar soluciones tecnológicas accesibles para la identificación y localización de mascotas, promoviendo una comunidad comprometida con su cuidado y seguridad.
          </p>
        </section>

        <section className="about-section">
          <h3>Visión</h3>
          <p>
            Ser la red más confiable de identificación de mascotas en Latinoamérica, integrando tecnología, empatía y colaboración social.
          </p>
        </section>

        <section className="about-section">
          <h3>Valores</h3>
          <ul>
            <li>❤️ Amor por los animales</li>
            <li>🔒 Compromiso con la seguridad</li>
            <li>💡 Innovación tecnológica</li>
            <li>🤝 Trabajo colaborativo</li>
            <li>🌱 Responsabilidad social</li>
          </ul>
        </section>

        <section className="about-section about-contact">
          <h3>Contáctanos</h3>
          <p>📧 Email: <a href="mailto:contacto@qrm.com">contacto@qrm.com</a></p>
          <p>📞 Teléfono: +57 300 123 4567</p>
          <p>📍 Dirección: Calle 123 #45-67, Medellín</p>
          <p>🌐 Web: <a href="https://qrm.com" target="_blank" rel="noopener noreferrer">qrm.com</a></p>
        </section>
      </div>
    </div>
  );
}

export default About;
