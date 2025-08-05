import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/Home.css';
import { motion } from 'framer-motion';
import { Carousel } from 'react-bootstrap';

const images = [
  '/images/banner-inutrips-principal.jpg',
];

const Home = () => {
  return (
    <>
      {/* Solo Carrusel al inicio */}
      <section className="hero-carousel d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <Carousel fade controls={false} indicators interval={3500} className="inu-carousel shadow-lg rounded-4 overflow-hidden">
                {images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100 hero-img"
                      src={img}
                      alt={`slide-${idx}`}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '350px',
                        borderRadius: '1.5rem'
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="services-section py-5">
        <div className="container">
          <h2 className="fw-bold mb-5 text-inu text-center">
            ¿Qué ofrece <span className="brand-inu">INU<span className="brand-trips">Trips</span></span>?
          </h2>
          <div className="row g-4">
            {/* APP MÓVIL */}
            <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
              <div className="card h-100 shadow-sm p-3 border-0 service-card">
                <img src="/images/1.5.jpg" alt="App INUTrips" className="img-fluid rounded mb-3" />
                <h5 className="fw-bold text-inu">App INUTrips</h5>
                <p className="small">
                  Gestiona tus viajes, registra tus mascotas y accede a servicios <strong>pet-friendly</strong> desde tu celular con la app oficial de <span className="brand-inu">INUTrips</span>.
                </p>
                <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.inutrips.app" 
                    className="btn btn-inu btn-sm px-4"
                  >
                    Google Play
                  </a>
                  <a 
                    href="https://apps.apple.com/co/app/tu-app-inutrips" 
                    className="btn btn-outline-dark btn-sm px-4"
                  >
                    App Store
                  </a>
                </div>
              </div>
            </motion.div>
            {/* COLLAR QR */}
            <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
              <div className="card h-100 shadow-sm p-3 border-0 service-card">
                <img src="/images/Untitled.png" alt="Collar QR INU" className="img-fluid rounded mb-3" />
                <h5 className="fw-bold text-inu">Collar QR INU</h5>
                <p className="small">
                  El <strong>Collar QR INU</strong> es un producto oficial de <span className="brand-inu">INUTrips</span>, diseñado para que tu mascota esté <em>siempre identificada</em>.
                  Si se pierde, cualquier persona puede escanear el QR y contactarte de inmediato.
                </p>
                <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
                  <Link 
                    to="/register" 
                    className="btn btn-inu btn-sm px-4"
                  >
                    Regístrate
                  </Link>
                  <Link 
                    to="/CompraQr" 
                    className="btn btn-outline-dark btn-sm px-4"
                  >
                    Saber más
                  </Link>
                </div>
              </div>
            </motion.div>
            {/* KIT INU */}
            <motion.div className="col-md-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>
              <div className="card h-100 shadow-sm p-3 border-0 service-card">
                <img src="/images/1.1.jpg" alt="Kit INU" className="img-fluid rounded mb-3" />
                <h5 className="fw-bold text-inu">Kit INU</h5>
                <p className="small">Tu mascota viaja segura y cómoda. Incluye lona, cinturones y bozal especial.</p>
                <a href="https://www.instagram.com/p/DHEyO9FTMow/?img_index=1" className="btn btn-inu btn-sm px-3" target="_blank" rel="noopener noreferrer">
                  Ver Kit INU
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="how-section py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-inu text-center mb-4">¿Cómo funciona?</h3>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <img src="/images/1.5.jpg" alt="Descarga la app" className="mb-3" style={{width: 80}} />
              <h6 className="fw-bold">1. Descarga la app</h6>
              <p className="small">Regístrate y crea el perfil de tu mascota.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src="/images/5.2.jpg" alt="Solicita tu viaje" className="mb-3" style={{width: 80}} />
              <h6 className="fw-bold">2. Solicita tu viaje</h6>
              <p className="small">Elige el destino y el tipo de servicio que necesitas.</p>
            </div>
            <div className="col-md-4 mb-4">
              <img src="/images/5.2.jpg" alt="Viaja seguro" className="mb-3" style={{width: 80}} />
              <h6 className="fw-bold">3. Viaja seguro</h6>
              <p className="small">Disfruta el trayecto con tu mascota y califica el servicio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits-section py-5">
        <div className="container">
          <h3 className="fw-bold text-inu text-center mb-4">Beneficios de usar INU Trips</h3>
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <img src="/images/5.3.jpg" alt="Pet Friendly" style={{width: 60}} />
              <p className="fw-semibold mt-2">100% Pet Friendly</p>
            </div>
            <div className="col-md-3 mb-4">
              <img src="/images/5.2.jpg" alt="Soporte 24/7" style={{width: 60}} />
              <p className="fw-semibold mt-2">Soporte 24/7</p>
            </div>
            <div className="col-md-3 mb-4">
              <img src="/images/5.1.jpg" alt="Cobertura" style={{width: 60}} />
              <p className="fw-semibold mt-2">Cobertura nacional</p>
            </div>
            <div className="col-md-3 mb-4">
              <img src="/images/5.4.jpg" alt="Conductores capacitados" style={{width: 60}} />
              <p className="fw-semibold mt-2">Conductores capacitados</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonials-section py-5 bg-light">
        <div className="container">
          <h3 className="fw-bold text-inu text-center mb-4">Testimonios</h3>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm p-3 h-100">
                <img src="/images/about-3.jpg" alt="mujer con perro" style={{width: 250}} />
                <p className="small">"Viajar con mi perro nunca fue tan fácil. Los conductores son muy amables y entienden a los animales."</p>
                <div className="fw-bold mt-2">- Laura G.</div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm p-3 h-100">
                <img src="/images/image_1.jpg" alt="Conductores capacitados" style={{width: 250}} />
                <p className="small">"Me encanta la seguridad y la comodidad. ¡Recomiendo INU Trips a todos los pet lovers!"</p>
                <div className="fw-bold mt-2">- Andrés P.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO / CTA */}
      <section className="cta-section py-5">
        <div className="container text-center">
          <h3 className="fw-bold text-inu mb-3">¿Listo para viajar con tu mascota?</h3>
          <p className="mb-4">Descarga la app o contáctanos para más información.</p>
          <a href="https://play.google.com/store/apps/details?id=com.inutrips.app" className="btn btn-inu btn-lg mx-2 mb-2">
            Descargar App
          </a>
          <a href="mailto:info@inutrips.com" className="btn btn-outline-dark btn-lg mx-2 mb-2">
            Contáctanos
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;