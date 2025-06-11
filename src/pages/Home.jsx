import React from 'react';
import '../assets/Home.css';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        

        <div className="hero">
          <h1>
            Crea un <b>collar único</b> con <br /> código QR. Identificación <br />
            personalizada y segura.
          </h1>
          <div className="hero-buttons">
            <Link to="/CompraQr" className="btn black">Com</Link>
            <Link to="/Encontrar" className="btn black">Encontrar mi mascota</Link>
            <Link to="/login" className="btn black">Inicio de sesion</Link>
          </div>
          <div className="hero-image pets" />
        </div>
      </header>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-image" />
        <div className="info-content">
          <h2>Cuida y Protege a nuestras mascotas</h2>
          <p>
            Nuestro servicio permite a los dueños identificar fácilmente a sus mascotas mediante collares con código QR. Estos collares contienen información vital en caso de pérdida, asegurando una rápida localización y devolución.
          </p>
          <div className="info-buttons">
            <Link to="/Register" className="btn green">Registrate Aqui</Link>
             <Link to="/About" className="btn black">Descubre mas</Link>

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="service">
          <div className="icon pink" />
          <h3>Acceso rápido a información</h3>
          <p>Accede fácilmente a los datos importantes de tu mascota desde cualquier dispositivo.</p>
        </div>
        <div className="service">
          <div className="icon blue" />
          <h3>Seguridad y protección</h3>
          <p>Garantizamos que tu mascota esté siempre identificada y protegida.</p>
        </div>
        <div className="service">
          <div className="icon magenta" />
          <h3>Personalización</h3>
          <p>Diseña el collar ideal con el estilo y color que prefieras.</p>
        </div>
        <div className="service">
          <div className="icon green" />
          <h3>Tecnología moderna</h3>
          <p>Utilizamos sistemas avanzados con QR escaneable de última generación.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="logo">🐾 INUPET</div>
          <p>Identificación inteligente para tus mascotas. Fácil, rápido y seguro.</p>
          <div className="social-icons">
            {/* Aquí van íconos reales o placeholders */}
            <span>🐶</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>
        <div className="footer-links">
          <span>Compañía</span>
          <span>Soporte</span>
          <span>Términos y condiciones</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
