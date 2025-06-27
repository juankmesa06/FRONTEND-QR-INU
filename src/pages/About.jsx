import React from 'react';
import '../assets/About.css';

function About() {
  return (
    <div className="about-container">

      {/* HERO con video o imagen */}
      <section className="about-hero-section">
        <div className="video-wrapper">
          <video
            className="about-video"
            src="/videos/hero-inutrips.mp4" // ⚠️ Asegúrate de tener este video en /public/videos/
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="video-overlay">
            <h1 className="about-hero-title">Transformamos la movilidad pet-friendly en Colombia</h1>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="about-card">
        <h2 className="about-title">Quiénes Somos</h2>
        <p className="about-text">
          <strong>INUTrips</strong> es una plataforma integral de movilidad pet-friendly en Colombia, comprometida con ofrecer soluciones tecnológicas seguras para humanos y animales. Como parte de este ecosistema, el producto <strong>QR Mascotas</strong> identifica mascotas mediante collares con código QR, conectándolas con sus familias.
        </p>
        <p className="about-text">
          Creemos que las mascotas son parte de la familia y merecen estar protegidas. El <strong>Collar QR INU</strong> permite localizarlas fácilmente en caso de extravío, mediante tecnologías modernas integradas con nuestros servicios.
        </p>
        <img src="/images/gallery-3.jpg" alt="Familia con mascota" className="about-img-full" />
      </section>

      {/* MISIÓN, VISIÓN, VALORES */}
      <div className="about-sections">
        <section className="about-section">
          <h3>Misión</h3>
          <p>
            Proporcionar soluciones inteligentes que conecten la movilidad urbana con el bienestar de las mascotas.
          </p>
        </section>

        <section className="about-section">
          <h3>Visión</h3>
          <p>
            Ser la red pet-friendly más confiable de Latinoamérica, integrando innovación, seguridad y amor por los animales.
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
      </div>

      {/* GALERÍA DE MASCOTAS */}
      <section className="about-gallery">
        <h2 className="about-title text-center">Nuestros Peludos Embajadores</h2>
        <div className="gallery-grid">
          <img src="/images/image_2.jpg" alt="Perro feliz" />
          <img src="/images/gallery-2.jpg" alt="Paseo pet-friendly" />
          <img src="/images/gallery-3.jpg" alt="Collar QR INU" />
          <img src="/images/gallery-4.jpg" alt="Gato protegido" />
        </div>
      </section>

      {/* CONTACTO */}
      <section className="about-section about-contact mt-5">
        <h3>Contáctanos</h3>
        <p>📧 Email: <a href="mailto:soporte@inutrips.com">soporte@inutrips.com</a></p>
        <p>📞 Teléfono: +57 300 123 4567</p>
        <p>📍 Dirección: Calle 123 #45-67, Medellín, Colombia</p>
        <p>🌐 Web: <a href="https://www.inutrips.com" target="_blank" rel="noopener noreferrer">www.inutrips.com</a></p>
      </section>
    </div>
  );
}

export default About;
