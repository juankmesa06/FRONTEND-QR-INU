import React from 'react';  
import '../assets/About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-card">
        <h2 className="about-title">Quiénes Somos</h2>
        <p className="about-text">
          <strong>INUTrips</strong> es una plataforma integral de movilidad pet-friendly en Colombia, comprometida con ofrecer soluciones tecnológicas seguras para humanos y animales. Como parte de este ecosistema, el producto <strong>QR Mascotas</strong> ha sido diseñado para identificar mascotas mediante collares con código QR, conectándolas directamente con su familia y la red de transporte INU.
        </p>
        <p className="about-text">
          En INUTrips creemos que las mascotas son parte de la familia y merecen estar protegidas. Por eso, el <strong>Collar QR INU</strong> permite localizar a una mascota en caso de extravío, utilizando tecnologías modernas e integradas con nuestros servicios de movilidad.
        </p>
        <p className="about-text">
          Esta iniciativa nace del amor por los animales y la visión de una movilidad más empática, conectada y eficiente. En INUTrips, cada paso que damos está pensado en mejorar la calidad de vida de nuestros usuarios y sus compañeros peludos.
        </p>
      </section>

      <div className="about-sections">
        <section className="about-section">
          <h3>Misión</h3>
          <p>
            Proporcionar soluciones tecnológicas inteligentes que conecten la movilidad urbana con la protección y bienestar de las mascotas, promoviendo una ciudad más segura y solidaria.
          </p>
        </section>

        <section className="about-section">
          <h3>Visión</h3>
          <p>
            Ser la red de transporte pet-friendly más confiable de Latinoamérica, integrando innovación, seguridad y amor por los animales en cada ruta y producto que ofrecemos.
          </p>
        </section>

        <section className="about-section">
          <h3>Valores</h3>
          <ul>
            <li>❤️ Amor por los animales</li>
            <li>🔒 Seguridad e integridad</li>
            <li>💡 Tecnología con propósito</li>
            <li>🚌 Movilidad inclusiva</li>
            <li>🌍 Sostenibilidad</li>
            <li>🤝 Comunidad y colaboración</li>
          </ul>
        </section>

        <section className="about-section about-contact">
          <h3>Contáctanos</h3>
          <p>📧 Email: <a href="mailto:soporte@inutrips.com">soporte@inutrips.com</a></p>
          <p>📞 Teléfono: +57 300 123 4567</p>
          <p>📍 Dirección: Calle 123 #45-67, Medellín, Colombia</p>
          <p>🌐 Web: <a href="https://www.inutrips.com" target="_blank" rel="noopener noreferrer">www.inutrips.com</a></p>
        </section>
      </div>
    </div>
  );
}

export default About;
