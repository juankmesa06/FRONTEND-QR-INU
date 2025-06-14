import React from 'react'; 
import '../assets/About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-card">
        <h2 className="about-title">Quiénes Somos</h2>
        <p className="about-text">
          <strong>QR Mascotas</strong> es un producto innovador de la plataforma <strong>INUTrips</strong>, diseñado para ofrecer soluciones de identificación inteligente para nuestros compañeros peludos.
        </p>
        <p className="about-text">
          En INUTrips no solo nos movilizamos con responsabilidad, también extendemos nuestro compromiso con el bienestar animal. Por eso desarrollamos el <strong>Collar QR</strong>, un identificador moderno que ayuda a localizar mascotas perdidas de forma rápida y confiable, integrándolas como pasajeros dentro del ecosistema digital de nuestra plataforma.
        </p>
        <p className="about-text">
          Este proyecto nació del amor por los animales, combinando tecnología, empatía y movilidad inteligente para que cada mascota registrada esté siempre conectada con su familia.
        </p>
      </section>

      <div className="about-sections">
        <section className="about-section">
          <h3>Misión</h3>
          <p>
            Brindar soluciones tecnológicas accesibles y efectivas para la identificación de mascotas, integradas con el ecosistema de movilidad de INUTrips.
          </p>
        </section>

        <section className="about-section">
          <h3>Visión</h3>
          <p>
            Ser líderes en Latinoamérica en movilidad segura y conectada para personas y mascotas, fomentando ciudades más responsables y amigables con los animales.
          </p>
        </section>

        <section className="about-section">
          <h3>Valores</h3>
          <ul>
            <li>❤️ Amor por los animales</li>
            <li>🔒 Compromiso con la seguridad</li>
            <li>💡 Innovación tecnológica</li>
            <li>🚌 Movilidad inclusiva</li>
            <li>🤝 Trabajo colaborativo</li>
            <li>🌱 Responsabilidad social</li>
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
